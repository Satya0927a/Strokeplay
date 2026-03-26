import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Apple, ChartArea, Heart, Home, LogOut, Plus, PlusIcon, Settings, Trophy, Upload } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { fetchoverview, fetchscores, logscores } from "../services/api";
import Loading from "../components/Loading";

/* ─── Google Fonts + Base Styles ─── */


/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut", delay: d } }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.32, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

/* ─── Tiny SVG icon ─── */
const Ic = ({ d, size = 18, stroke = "currentColor", fill = "none", sw = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
    {typeof d === "string" ? <path d={d} /> : d}
  </svg>
);

const ic = {
  home: "M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z",
  golf: <><circle cx="12" cy="5" r="2" fill="currentColor" stroke="none" /><line x1="12" y1="7" x2="12" y2="17" /><path d="M12 12l5-2.5" /><line x1="7" y1="21" x2="17" y2="21" /></>,
  heart: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
  trophy: <><path d="M8 21h8M12 17v4M7 4H4a1 1 0 00-1 1v3a4 4 0 004 4h1M17 4h3a1 1 0 011 1v3a4 4 0 01-4 4h-1" /><path d="M7 4h10v8a5 5 0 01-10 0V4z" /></>,
  upload: <><polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" /></>,
  user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  settings: "M12 15a3 3 0 100-6 3 3 0 000 6zM19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z",
  plus: "M12 5v14M5 12h14",
  edit: "M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  check: "M20 6L9 17l-5-5",
  arrow: "M5 12h14M12 5l7 7-7 7",
  bell: "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  menu: "M3 6h18M3 12h18M3 18h18",
  x: "M18 6L6 18M6 6l12 12",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 100 6 3 3 0 000-6z",
  logout: "M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  img: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></>,
  chart: "M3 3v18h18M7 16l4-4 4 4 4-4",
  lock: "M19 11H5a2 2 0 00-2 2v7a2 2 0 002 2h14a2 2 0 002-2v-7a2 2 0 00-2-2zM17 11V7a5 5 0 00-10 0v4",
  mail: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6",
  phone: "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.15a16 16 0 006.93 6.93l1.51-1.51a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
};

/* ─── Shared small components ─── */
const Label = ({ children, required }) => (
  <div className="text-[.78rem] font-semibold text-white/50 mb-[7px] tracking-[.04em] uppercase flex gap-1">
    {children}{required && <span className="text-[#00C46A]">*</span>}
  </div>
);

const SectionTitle = ({ icon, title, sub }) => (
  <div className="mb-[26px]">
    <div className="flex items-center gap-2.5 mb-[5px]">
      <div className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[#00C46A]"
        style={{ background: "rgba(0,196,106,.1)", border: "1px solid rgba(0,196,106,.18)" }}>
        <Ic d={icon} size={15} sw={2} />
      </div>
      <h2 className="font-display text-[1.2rem] font-bold text-[#f0f4f1]">{title}</h2>
    </div>
    {sub && <p className="text-[.85rem] text-white/38 ml-[42px]">{sub}</p>}
  </div>
);

const Divider = () => <div className="h-px my-6" style={{ background: "rgba(255,255,255,.06)" }} />;

/* ═══════════════════════════════════════════
   SECTION 1 — OVERVIEW
═══════════════════════════════════════════ */
function Overview({ setActive, username, userdash }) {
  const pool = userdash.overview.pool
  const month = new Date(pool.resultdate).toLocaleDateString("en-IN", {
    month: "long"
  })
  const stats = [
    { label: "Rounds This Month", value: `${userdash.overview.rounds}`, sub: "+2 vs last month", color: "#00C46A", icon: ic.golf },
    { label: "Draw Entries", value: `${userdash.overview.rounds * 2}`, sub: "This month's draw", color: "#FFB800", icon: ic.star },
    { label: "Best Score", value: `${userdash.overview.bestscore}-pts`, sub: "Stableford · Jun 3", color: "#00E57A", icon: ic.trophy },
    { label: "Total Donated", value: `$${userdash.overview.donated}`, sub: "Cancer Research UK", color: "#00C46A", icon: ic.heart },
  ];

  const recent = userdash.overview.recentrounds
  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">

      {/* Welcome bar */}
      <div className="glass-em rounded-2xl px-5 py-[18px] mb-6 flex justify-between items-center flex-wrap gap-3.5">
        <div>
          <div className="font-display font-bold text-[1.05rem] text-[#f0f4f1]">Good morning, {username} 👋</div>
          <div className="text-[.83rem] text-white/45 mt-[3px]">
            The {month} draw closes in <strong className="text-[#FFB800]">14 days</strong> — you have {userdash.overview.rounds * 2} entries so far.
          </div>
        </div>
        <button className= {`bg-emerald-500 text-black font-display rounded-[4px]  w-fit flex justify-center p-2 glow-shadow hover:scale-105 transition-all cursor-pointer ${userdash.overview.rounds == 0? "animate-pulse":"animate-none"} `} onClick={() => setActive("scores")}>
          <Plus />
          Log a Score
        </button>
      </div>

      {/* Stat cards */}
      <div className="grid gap-3.5 mb-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))" }}>
        {stats.map((s, i) => (
          <motion.div key={i} variants={fadeUp} custom={i * 0.06}
            className="glass stat-card rounded-[13px] px-5 py-[18px]" style={{ border: "1px solid rgba(255,255,255,.07)" }}>
            <div className="flex justify-between items-start mb-3.5">
              <span className="text-[.75rem] text-white/40 font-medium uppercase tracking-[.05em]">{s.label}</span>
              <div className="w-7 h-7 rounded-[7px] flex items-center justify-center"
                style={{ background: `rgba(${s.color === "#FFB800" ? "255,184,0" : "0,196,106"},.1)`, color: s.color }}>
                <Ic d={s.icon} size={14} sw={2} />
              </div>
            </div>
            <div className="font-display text-[1.65rem] font-extrabold leading-none" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[.75rem] text-white/32 mt-1.5">{s.sub}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4" style={{ gridTemplateColumns: "1.4fr 1fr" }}>
        {/* Recent scores */}
        <div className="glass rounded-2xl px-5 py-5">
          <div className="flex justify-between items-center mb-[18px]">
            <div className="font-display font-bold text-[.95rem] text-[#f0f4f1]">Recent Rounds</div>
            <button className="btn-ghost px-3 py-[5px] text-[.77rem]" onClick={() => setActive("scores")}>View all</button>
          </div>
          <div className="flex flex-col">
            {recent.length == 0 && <div>Your recent scoreboard is empty</div>}
            {recent.map((r, i) => (
              <div key={i} className="score-row flex items-center px-2.5 py-2.5 rounded-lg gap-3.5"
                style={{ borderBottom: i < recent.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
                <div className="w-[38px] h-[38px] rounded-[9px] flex flex-col items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(255,255,255,.04)" }}>
                  <span className="text-[.62rem] text-white/35 uppercase leading-none">{r.date.split(" ")[0]}</span>
                  <span className="text-[.8rem] font-bold text-[#e8f0eb]">{r.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[.87rem] font-medium text-[#e8f0eb] truncate">{r.course}</div>
                  <div className="text-[.73rem] text-white/35 mt-0.5">{r.entries} draw {r.entries === 1 ? "entry" : "entries"}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-display font-extrabold text-[.95rem]" style={{ color: r.score >= 36 ? "#00C46A" : "#e8f0eb" }}>{r.score}</div>
                  <div className="text-[.7rem] text-white/30">pts</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-3.5">
          {/* Draw status */}
          <div className="glass-gold rounded-2xl px-5 py-5">
            <div className="flex justify-between items-start mb-4">
              <div className="font-display font-bold text-[.95rem] text-[#f0f4f1]">{ month} Draw</div>
              <span className="badge badge-gold">OPEN</span>
            </div>
            <div className="font-display text-[1.8rem] font-extrabold text-[#FFB800] mb-1">${pool.amount}</div>
            <div className="text-[.78rem] text-white/40 mb-3.5">Prize pool · 1st prize ${(pool.amount * 0.4).toFixed(2)}</div>
            <div className="prog-bar mb-2">
              <div className="prog-fill" style={{ width: "55%", background: "linear-gradient(90deg,#FFB800,#FFD700)" }} />
            </div>
            <div className="flex justify-between">
              <span className="text-[.72rem] text-white/35">Closes in 14 days</span>
              <span className="text-[.72rem] text-[#FFB800] font-semibold">14 entries</span>
            </div>
          </div>

          {/* Charity */}
          <div className="glass rounded-2xl px-5 py-[18px]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[9px] flex items-center justify-center"
                style={{ background: "rgba(0,196,106,.1)" }}>
                <Ic d={ic.heart} size={16} stroke="#00C46A" sw={1.8} />
              </div>
              <div className="flex-1">
                <div className="text-[.85rem] font-semibold text-[#f0f4f1]">Cancer Research UK</div>
                <div className="text-[.73rem] text-white/35 mt-0.5">Your chosen charity</div>
              </div>
              <button className="btn-ghost px-2.5 py-1 text-[.72rem]" onClick={() => setActive("charity")}>Change</button>
            </div>
            <Divider />
            <div className="flex justify-between">
              <span className="text-[.78rem] text-white/38">Donated this month</span>
              <span className="font-display font-bold text-[#00C46A] text-[.9rem]">${userdash.overview.donated}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — SCORES
═══════════════════════════════════════════ */
function Scores({ userdash, setuserdash }) {
  const [form, setForm] = useState({ date: "", course: "", score: "", holes: "18" });
  const scores = userdash.scores

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await fetchscores()
        console.log(result.data);
        setuserdash({
          ...userdash,
          scores: result.data.data
        })
      } catch (error) {
        console.log(error.response.data);
      }
    }
    if (!userdash.scores) {
      fetchdata()
    }
  }, [])

  if (!scores) {
    return (
      <div className="text-3xl">
        loading scores...
      </div>
    )
  }

  const getEntries = s => s >= 40 ? 4 : s >= 36 ? 3 : s >= 30 ? 2 : 1;

  const handleSubmit = async () => {
    if (!form.date || !form.course || !form.score) return;
    const s = parseInt(form.score);
    try {
      const result = await logscores(form.course, s, form.date, parseInt(form.holes))
      console.log(result.data);
      setuserdash({
        ...userdash,
        scores: [
          ...scores,
          result.data.data
        ]
      })
      setForm({ date: "", course: "", score: "", holes: "18" });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const scoreBadge = s => {
    if (s >= 40) return { cls: "badge-green", label: "Excellent" };
    if (s >= 36) return { cls: "badge-green", label: "Good" };
    if (s >= 30) return { cls: "badge-grey", label: "Average" };
    return { cls: "badge-red", label: "Below par" };
  };

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={ic.golf} title="Golf Scores" sub="Log and manage your Stableford rounds. Higher scores earn more draw entries." />

      {/* Entry form */}
      <div className="glass rounded-2xl px-6 py-5 mb-6">
        <div className="font-display font-bold text-[.9rem] text-[#f0f4f1] mb-[18px] flex items-center gap-2">
          <PlusIcon /> Log new Score
        </div>
        <div className="grid gap-3.5 mb-3.5" style={{ gridTemplateColumns: "1fr 2fr 1fr 1fr" }}>
          <div><Label required>Date</Label><input type="date" className="sp-input" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} /></div>
          <div><Label required>Course Name</Label><input type="text" className="sp-input" placeholder="e.g. St Andrews Links" value={form.course} onChange={e => setForm(p => ({ ...p, course: e.target.value }))} /></div>
          <div><Label required>Stableford Score</Label><input type="number" className="sp-input" placeholder="e.g. 36" min="0" max="72" value={form.score} onChange={e => setForm(p => ({ ...p, score: e.target.value }))} /></div>
          <div><Label>Holes</Label>
            <select className="sp-input" value={form.holes} onChange={e => setForm(p => ({ ...p, holes: e.target.value }))}>
              <option value="18">18 Holes</option>
              <option value="9">9 Holes</option>
            </select>
          </div>
        </div>


        <AnimatePresence>
          {form.score && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              className="glass-em rounded-[9px] px-4 py-2.5 mb-4 flex items-center gap-2.5">
              <Ic d={ic.star} size={15} stroke="#00C46A" sw={2} />
              <span className="text-[.83rem] text-white/60">
                This score earns <strong className="text-[#00C46A]">{getEntries(parseInt(form.score) || 0)} draw {getEntries(parseInt(form.score) || 0) === 1 ? "entry" : "entries"}</strong>
                {parseInt(form.score) < 36 && <span className="text-white/35"> · Score 36+ for 3 entries</span>}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex gap-2.5">
          <button className="bg-emerald-600 rounded-[4px] font-display text-black  w-fit p-2 flex items-center justify-center hover:scale-105 transition-all cursor-pointer glow-shadow" onClick={handleSubmit}>
            <PlusIcon /> Log Score
          </button>
        </div>
      </div>

      {/* Score table */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-[18px] flex justify-between items-center" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="font-display font-bold text-[.9rem] text-[#f0f4f1]">Round History</div>
          <span className="text-[.78rem] text-white/35">{scores.length} rounds logged</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                {["Date", "Course", "Score", "Holes", "Draw Entries", "Status", ""].map(h => (
                  <th key={h} className="px-[18px] py-2.5 text-left text-[.73rem] text-white/35 font-semibold uppercase tracking-[.06em] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scores.map(row => {
                const { cls, label } = scoreBadge(row.score);
                return (
                  <tr key={row.id} className="score-row" style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <td className="px-[18px] py-3 text-[.85rem] text-white/55 whitespace-nowrap">{row.date}</td>
                    <td className="px-[18px] py-3 text-[.88rem] text-[#e8f0eb] font-medium">{row.course}</td>
                    <td className="px-[18px] py-3">
                      <span className="font-display text-base font-extrabold" style={{ color: row.score >= 36 ? "#00C46A" : "#e8f0eb" }}>{row.score}</span>
                      <span className="text-[.75rem] text-white/30 ml-0.5">pts</span>
                    </td>
                    <td className="px-[18px] py-3 text-[.83rem] text-white/45">{row.holes}</td>
                    <td className="px-[18px] py-3">
                      <div className="flex gap-[3px]">
                        {[...Array(row.entries)].map((_, i) => (
                          <div key={i} className="w-4 h-4 rounded-[4px] flex items-center justify-center"
                            style={{ background: "rgba(0,196,106,.18)", border: "1px solid rgba(0,196,106,.3)" }}>
                            <Ic d={ic.star} size={8} stroke="none" fill="#00C46A" />
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-[18px] py-3"><span className={`badge ${cls}`}>{label}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — CHARITY
═══════════════════════════════════════════ */
function Charity() {
  const [selected, setSelected] = useState(1);
  const [saved, setSaved] = useState(false);

  const charities = [
    { id: 1, name: "Cancer Research UK", cat: "Health & Medical", members: 380, raised: "£12,400", desc: "Funding life-saving cancer research across the UK and beyond.", color: "#00C46A" },
    { id: 2, name: "Teenage Cancer Trust", cat: "Youth Health", members: 292, raised: "£9,200", desc: "Providing specialist cancer care and support for young people.", color: "#00E57A" },
    { id: 3, name: "Golf Foundation", cat: "Sport & Community", members: 264, raised: "£8,100", desc: "Opening the game of golf to young people across Britain.", color: "#00C46A" },
    { id: 4, name: "MacMillan Cancer", cat: "Health & Support", members: 215, raised: "£6,800", desc: "Support for people living with cancer and their families.", color: "#00E57A" },
    { id: 5, name: "British Heart Fdn", cat: "Cardiovascular", members: 198, raised: "£5,900", desc: "Research, prevention and treatment of heart and circulatory disease.", color: "#00C46A" },
    { id: 6, name: "Alzheimer's Society", cat: "Neurological", members: 176, raised: "£4,700", desc: "Care and research for those affected by dementia.", color: "#00E57A" },
  ];

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={ic.heart} title="Choose Your Charity" sub="10% of your monthly subscription is donated to your chosen charity." />

      <div className="glass-em rounded-xl px-[18px] py-3.5 mb-6 flex items-center gap-2.5">
        <Ic d={ic.check} size={16} stroke="#00C46A" sw={2.5} />
        <span className="text-[.85rem] text-white/60">You can change your charity anytime. Donations are processed on the 1st of each month.</span>
      </div>

      <div className="grid gap-3.5 mb-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {charities.map((c, i) => (
          <motion.div key={c.id} variants={fadeUp} custom={i * 0.05}
            className={`glass charity-card rounded-[13px] px-5 py-5 relative ${selected === c.id ? "selected" : ""}`}
            onClick={() => setSelected(c.id)}>

            <AnimatePresence>
              {selected === c.id && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute top-3.5 right-3.5 w-[22px] h-[22px] rounded-full bg-[#00C46A] flex items-center justify-center">
                  <Ic d={ic.check} size={11} stroke="#061209" sw={3} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-10 h-10 rounded-[10px] flex items-center justify-center"
                style={{ background: "rgba(0,196,106,.1)", border: "1px solid rgba(0,196,106,.2)" }}>
                <Ic d={ic.heart} size={18} stroke={c.color} sw={1.8} />
              </div>
              <div>
                <div className="font-semibold text-[.9rem] text-[#f0f4f1]">{c.name}</div>
                <span className="badge badge-grey mt-1 text-[.67rem]">{c.cat}</span>
              </div>
            </div>

            <p className="text-[.82rem] text-white/40 leading-[1.6] mb-3.5">{c.desc}</p>

            <div className="flex justify-between text-[.75rem]">
              <span className="text-white/30">{c.members} members supporting</span>
              <span className="text-[#00C46A] font-semibold">{c.raised} raised</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-3.5">
        <button className="btn-em btn-md" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>
          <Ic d={ic.check} size={16} stroke="#061209" sw={2.5} /> Save Choice
        </button>
        <AnimatePresence>
          {saved && (
            <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
              className="text-[.85rem] text-[#00C46A] flex items-center gap-1.5">
              <Ic d={ic.check} size={14} stroke="#00C46A" sw={2.5} /> Saved!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — WINNINGS & HISTORY
═══════════════════════════════════════════ */
function Winnings() {
  const [tab, setTab] = useState("draws");

  const draws = [
    { month: "May 2025", entries: 11, prize: "£130", result: "won", position: "4th", status: "Paid" },
    { month: "Apr 2025", entries: 8, prize: null, result: "none", position: "—", status: "—" },
    { month: "Mar 2025", entries: 14, prize: null, result: "none", position: "—", status: "—" },
    { month: "Feb 2025", entries: 10, prize: null, result: "none", position: "—", status: "—" },
    { month: "Jan 2025", entries: 6, prize: null, result: "none", position: "—", status: "—" },
  ];

  const donations = [
    { month: "Jun 2025", charity: "Cancer Research UK", amount: "£4.80", status: "Pending" },
    { month: "May 2025", charity: "Cancer Research UK", amount: "£4.80", status: "Paid" },
    { month: "Apr 2025", charity: "Cancer Research UK", amount: "£4.80", status: "Paid" },
    { month: "Mar 2025", charity: "Cancer Research UK", amount: "£4.80", status: "Paid" },
    { month: "Feb 2025", charity: "Cancer Research UK", amount: "£4.80", status: "Paid" },
  ];

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={ic.trophy} title="Participation & Winnings" sub="Your full draw history, prizes and charity donation log." />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3.5 mb-6">
        {[
          { label: "Total Winnings", value: "£130", color: "#FFB800", sub: "1 prize won" },
          { label: "Total Draws Entered", value: "5", color: "#00C46A", sub: "5 months active" },
          { label: "Total Donated", value: "£24", color: "#00E57A", sub: "Cancer Research UK" },
        ].map((s, i) => (
          <div key={i} className="glass stat-card rounded-[13px] px-5 py-[18px]">
            <div className="text-[.75rem] text-white/40 uppercase tracking-[.05em] mb-2.5">{s.label}</div>
            <div className="font-display text-[1.7rem] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[.75rem] text-white/30 mt-1.5">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Tab switcher */}
      <div className="flex gap-1.5 mb-[18px]">
        <button className={`tab-btn ${tab === "draws" ? "active" : ""}`} onClick={() => setTab("draws")}>Draw History</button>
        <button className={`tab-btn ${tab === "donations" ? "active" : ""}`} onClick={() => setTab("donations")}>Donations</button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "draws" && (
          <motion.div key="draws" variants={sectionVariants} initial="hidden" animate="visible" exit="exit"
            className="glass rounded-2xl overflow-hidden">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  {["Month", "Entries", "Position", "Prize", "Status"].map(h => (
                    <th key={h} className="px-5 py-2.5 text-left text-[.73rem] text-white/35 font-semibold uppercase tracking-[.06em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {draws.map((d, i) => (
                  <tr key={i} className="score-row" style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <td className="px-5 py-3 text-[.88rem] font-medium text-[#e8f0eb]">{d.month}</td>
                    <td className="px-5 py-3 text-[.88rem] text-white/60">{d.entries} entries</td>
                    <td className="px-5 py-3">
                      <span className="font-display font-bold text-[.9rem]" style={{ color: d.result === "won" ? "#FFB800" : "rgba(255,255,255,.35)" }}>{d.position}</span>
                    </td>
                    <td className="px-5 py-3">
                      {d.prize ? <span className="font-display font-extrabold text-[.95rem] text-[#FFB800]">{d.prize}</span>
                        : <span className="text-[.85rem] text-white/25">—</span>}
                    </td>
                    <td className="px-5 py-3">
                      <span className={`badge ${d.result === "won" ? "badge-gold" : "badge-grey"}`}>{d.result === "won" ? "Winner" : "No Win"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}

        {tab === "donations" && (
          <motion.div key="donations" variants={sectionVariants} initial="hidden" animate="visible" exit="exit"
            className="glass rounded-2xl overflow-hidden">
            <table className="w-full" style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  {["Month", "Charity", "Amount", "Status"].map(h => (
                    <th key={h} className="px-5 py-2.5 text-left text-[.73rem] text-white/35 font-semibold uppercase tracking-[.06em]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {donations.map((d, i) => (
                  <tr key={i} className="score-row" style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                    <td className="px-5 py-3 text-[.88rem] font-medium text-[#e8f0eb]">{d.month}</td>
                    <td className="px-5 py-3 text-[.88rem] text-white/60">{d.charity}</td>
                    <td className="px-5 py-3"><span className="font-display font-bold text-[.9rem] text-[#00C46A]">{d.amount}</span></td>
                    <td className="px-5 py-3"><span className={`badge ${d.status === "Paid" ? "badge-green" : "badge-gold"}`}>{d.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 5 — WINNER PROOF UPLOAD
═══════════════════════════════════════════ */
function WinnerProof() {
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef();

  const handleDrop = e => { e.preventDefault(); setDrag(false); const f = Array.from(e.dataTransfer.files); setFiles(prev => [...prev, ...f.slice(0, 3 - prev.length)]); };
  const handlePick = e => { const f = Array.from(e.target.files); setFiles(prev => [...prev, ...f.slice(0, 3 - prev.length)]); };
  const removeFile = i => setFiles(prev => prev.filter((_, idx) => idx !== i));
  const fmtSize = b => b > 1e6 ? `${(b / 1e6).toFixed(1)} MB` : `${(b / 1e3).toFixed(0)} KB`;

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={ic.upload} title="Upload Winner Proof" sub="Congratulations! Please upload proof to claim your prize." />

      {/* Eligibility notice */}
      <div className="glass-gold rounded-xl px-5 py-4 mb-6 flex gap-3.5 items-start">
        <div className="w-9 h-9 rounded-[9px] flex items-center justify-center flex-shrink-0 mt-0.5"
          style={{ background: "rgba(255,184,0,.15)" }}>
          <Ic d={ic.trophy} size={17} stroke="#FFB800" sw={1.8} />
        </div>
        <div>
          <div className="font-display font-bold text-[.9rem] text-[#FFB800] mb-1">May 2025 Draw — 4th Place Winner</div>
          <div className="text-[.83rem] text-white/50 leading-[1.6]">
            You've won <strong className="text-[#FFB800]">£130</strong>. Please upload one or more of the accepted documents below to verify your identity and claim your prize. Claims must be submitted within <strong className="text-[#f0f4f1]">14 days</strong>.
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div key="upload" variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
            {/* Accepted docs */}
            <div className="glass rounded-[13px] px-5 py-[18px] mb-5">
              <div className="font-display text-[.85rem] font-bold text-white/60 mb-3.5 uppercase tracking-[.06em]">Accepted Documents</div>
              <div className="grid gap-2.5" style={{ gridTemplateColumns: "repeat(auto-fill,minmax(190px,1fr))" }}>
                {[
                  { icon: ic.user, label: "Photo ID", sub: "Passport or driving licence" },
                  { icon: ic.img, label: "Score Card", sub: "Official club scorecard" },
                  { icon: ic.mail, label: "Confirmation Email", sub: "Draw winner notification" },
                ].map((d, i) => (
                  <div key={i} className="flex gap-2.5 px-3.5 py-3 rounded-[9px]"
                    style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
                    <Ic d={d.icon} size={17} stroke="rgba(255,255,255,.4)" sw={1.6} />
                    <div>
                      <div className="text-[.83rem] font-semibold text-white/70">{d.label}</div>
                      <div className="text-[.73rem] text-white/35">{d.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Drop zone */}
            <div className={`upload-zone ${drag ? "drag" : ""}`}
              onDragOver={e => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)}
              onDrop={handleDrop} onClick={() => fileRef.current?.click()}>
              <input ref={fileRef} type="file" multiple accept="image/*,.pdf" className="hidden" onChange={handlePick} />
              <div className="w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-[#00C46A] mx-auto mb-3.5"
                style={{ background: "rgba(0,196,106,.08)", border: "1px solid rgba(0,196,106,.18)" }}>
                <Ic d={ic.upload} size={24} sw={1.8} />
              </div>
              <div className="text-[.95rem] font-semibold text-[#e8f0eb] mb-1.5">Drop files here or click to browse</div>
              <div className="text-[.8rem] text-white/35">JPG, PNG, PDF · Max 10MB per file · Up to 3 files</div>
            </div>

            {/* File list */}
            <AnimatePresence>
              {files.length > 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex flex-col gap-2">
                  {files.map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, height: 0 }}
                      className="glass rounded-[10px] px-4 py-3 flex items-center gap-3">
                      <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(0,196,106,.1)" }}>
                        <Ic d={ic.img} size={15} stroke="#00C46A" sw={1.8} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[.87rem] font-medium text-[#e8f0eb] truncate">{f.name}</div>
                        <div className="text-[.73rem] text-white/35 mt-0.5">{fmtSize(f.size)}</div>
                      </div>
                      <span className="badge badge-green">Ready</span>
                      <button className="btn-danger p-1.5" onClick={() => removeFile(i)}><Ic d={ic.x} size={13} sw={2.5} /></button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-5 flex gap-3 items-center">
              <button className="btn-em btn-lg" disabled={files.length === 0}
                style={{ opacity: files.length === 0 ? .4 : 1, cursor: files.length === 0 ? "not-allowed" : "pointer" }}
                onClick={() => setSubmitted(true)}>
                <Ic d={ic.upload} size={17} stroke="#061209" sw={2.2} /> Submit Claim
              </button>
              {files.length === 0 && <span className="text-[.8rem] text-white/30">Upload at least one document to continue</span>}
            </div>
          </motion.div>
        ) : (
          <motion.div key="success" variants={sectionVariants} initial="hidden" animate="visible" exit="exit"
            className="glass-em rounded-2xl px-8 py-10 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: "rgba(0,196,106,.15)", border: "1px solid rgba(0,196,106,.3)" }}>
              <Ic d={ic.check} size={28} stroke="#00C46A" sw={2} />
            </div>
            <div className="font-display text-[1.2rem] font-extrabold text-[#f0f4f1] mb-2.5">Claim Submitted!</div>
            <p className="text-white/50 text-[.9rem] leading-[1.7] max-w-[380px] mx-auto mb-6">
              Your documents have been received. We'll review and process your <strong className="text-[#00C46A]">£130</strong> payment within 2–3 business days.
            </p>
            <button className="btn-em btn-md" onClick={() => { setSubmitted(false); setFiles([]); }}>Submit Another</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════ */
const navItems = [
  { id: "overview", label: "Overview", icon: <Home size={18} /> },
  { id: "scores", label: "My Scores", icon: <ChartArea size={18} /> },
  { id: "charity", label: "My Charity", icon: <Heart size={18} /> },
  { id: "winnings", label: "Draw & Winnings", icon: <Trophy size={18} /> },
  { id: "proof", label: "Winner Proof", icon: <Upload size={18} /> },
];

function Sidebar({ active, setActive, mobile, username }) {
  const { signOut } = useClerk()
  return (
    <div className={`sidebar ${mobile ? "open" : ""} flex flex-col h-screen sticky top-0 overflow-y-auto flex-shrink-0 px-3`}
      style={{ width: 230, background: "rgba(8,11,9,0.97)", backdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,.06)" }}>

      {/* Logo */}
      <div className="px-1.5 pt-5 pb-5 mb-3" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#00C46A,#00e07a)" }}>
            <Apple color="black" />
          </div>
          <span className="font-display text-base font-extrabold text-[#f0f4f1]">
            Stroke<span className="text-[#00C46A]">Play</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="text-[.67rem] font-bold text-white/25  uppercase px-3.5 pt-2 pb-1">Dashboard</div>
        {navItems.map(item => (
          <div key={item.id} className={`flex gap-2 items-center cursor-pointer hover:scale-105 hover:bg-emerald-400/10 rounded-[4px] p-2 ${active === item.id ? "bg-emerald-900" : ""}`} onClick={() => setActive(item.id)}>
            {item.icon}
            <span>{item.label}</span>
            {item.id === "proof" && (
              <span className="badge badge-gold ml-auto text-[.6rem] px-1.5 py-0.5">1</span>
            )}
          </div>
        ))}
      </div>

      {/* User footer */}
      <div className="pt-3.5 pb-5 mt-3" style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-[9px] mb-1.5">
          <UserButton />
          <div className="min-w-0">
            <div className="text-[.85rem] font-semibold text-[#f0f4f1] truncate">{username}</div>
            <div className="text-[.7rem] text-white/35">Pro Plan</div>
          </div>
        </div>
        <button className="flex w-full gap-2 items-center cursor-pointer hover:bg-red-400/10 p-2 rounded-[4px] text-red-400/60 " onClick={async () => { await signOut() }}>
          <LogOut size={20} /> Log Out
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT DASHBOARD
═══════════════════════════════════════════ */
export default function Dashboard() {
  const [active, setActive] = useState("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const { user } = useUser()
  const [userdash, setuserdash] = useState(null)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const result = await fetchoverview()
        // console.log(result.data.data);
        setuserdash({
          ...userdash,
          overview: result.data.data
        })
      } catch (error) {
        console.log(error);
      }
    }
    if (!userdash) {
      fetchdata()
    }
  }, [])
  if (!userdash) {
    return (
      <div className="flex justify-center items-center h-dvh">
        <Loading text="almost done"/>
      </div>
    )
  }
  const renderSection = () => {
    switch (active) {
      case "overview": return <Overview username={user.firstName} setActive={setActive} userdash={userdash} />;
      case "scores": return <Scores userdash={userdash} setuserdash={setuserdash} />;
      case "charity": return <Charity />;
      case "winnings": return <Winnings />;
      case "proof": return <WinnerProof />;
      case "profile": return <Profile username={user.firstName} />;
      default: return <Overview setActive={setActive} />;
    }
  };

  const currentLabel = navItems.find(n => n.id === active)?.label ?? "Dashboard";

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#080b09]">

        {/* Sidebar desktop */}
        <Sidebar username={user.firstName} active={active} setActive={id => { setActive(id); setMobileNav(false); }} />

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileNav && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[199]" onClick={() => setMobileNav(false)} />
              <Sidebar active={active} setActive={id => { setActive(id); setMobileNav(false); }} mobile />
            </>
          )}
        </AnimatePresence>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Top bar */}
          <div className="h-[58px] flex items-center justify-between px-6 flex-shrink-0"
            style={{ borderBottom: "1px solid rgba(255,255,255,.06)", background: "rgba(8,11,9,0.8)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-center gap-3">
              <button onClick={() => setMobileNav(p => !p)}
                className="mobile-hamburger hidden bg-transparent border-none text-white/50 cursor-pointer">
                <Ic d={ic.menu} size={20} sw={2} />
              </button>
              <span className="font-display font-bold text-[.97rem] text-[#f0f4f1]">{currentLabel}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <button className="btn-ghost p-[7px]"><Ic d={ic.bell} size={17} sw={1.8} /></button>
                <div className="absolute top-[5px] right-[5px] w-[7px] h-[7px] rounded-full bg-[#00C46A]"
                  style={{ border: "1.5px solid #080b09" }} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-7 pt-7 pb-10">
            <div className="max-w-[1050px] mx-auto">
              <AnimatePresence mode="wait">
                <div key={active}>
                  {renderSection()}
                </div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .sidebar { display: none !important; }
          .mobile-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}