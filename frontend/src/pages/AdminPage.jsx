import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Trophy, Heart, Settings, BarChart2, ShieldCheck,
  Bell, Menu, LogOut, Apple, ChevronDown, ChevronUp,
  TrendingUp, Gift, Search, Filter, Download, Eye,
  CheckCircle, XCircle, Clock, AlertTriangle, RefreshCw,
} from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/react";
import { fetchdraws, fetchusers } from "../services/api";

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
  check: "M20 6L9 17l-5-5",
  star:  "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  menu:  "M3 6h18M3 12h18M3 18h18",
  bell:  "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
  arrow: "M5 12h14M12 5l7 7-7 7",
  x:     "M18 6L6 18M6 6l12 12",
};

/* ─── Shared components ─── */
const Label = ({ children }) => (
  <div className="text-[.78rem] font-semibold text-white/50 mb-[7px] tracking-[.04em] uppercase">{children}</div>
);

const Divider = () => <div className="h-px my-5" style={{ background: "rgba(255,255,255,.06)" }} />;

const SectionTitle = ({ icon, title, sub }) => (
  <div className="mb-6">
    <div className="flex items-center gap-2.5 mb-1">
      <div className="w-8 h-8 rounded-[9px] flex items-center justify-center text-[#00C46A]"
        style={{ background: "rgba(0,196,106,.1)", border: "1px solid rgba(0,196,106,.18)" }}>
        {icon}
      </div>
      <h2 className="font-display text-[1.2rem] font-bold text-[#f0f4f1]">{title}</h2>
    </div>
    {sub && <p className="text-[.85rem] text-white/38 ml-[42px]">{sub}</p>}
  </div>
);

/* ─── Status badge ─── */
const StatusBadge = ({ status }) => {
  const map = {
    Active:    { cls: "badge-green", icon: <CheckCircle size={11} /> },
    Inactive:  { cls: "badge-grey",  icon: <Clock size={11} /> },
    Suspended: { cls: "badge-red",   icon: <XCircle size={11} /> },
    Pending:   { cls: "badge-gold",  icon: <AlertTriangle size={11} /> },
    Paid:      { cls: "badge-green", icon: <CheckCircle size={11} /> },
    Won:       { cls: "badge-gold",  icon: null },
    "No Win":  { cls: "badge-grey",  icon: null },
  };
  const { cls, icon } = map[status] ?? { cls: "badge-grey", icon: null };
  return (
    <span className={`badge ${cls} flex items-center gap-1`}>
      {icon}{status}
    </span>
  );
};

/* ─── Mini sparkline bars ─── */
const Sparkline = ({ data, color = "#00C46A" }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-[3px] h-8">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm transition-all"
          style={{ height: `${(v / max) * 100}%`, background: color, opacity: 0.5 + (i / data.length) * 0.5 }} />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════ */

const MOCK_DRAWS = [
  { month: "Jun 2025", pool: "£8,420", entries: 2847, winners: 7,  status: "Open",   topPrize: "£2,500" },
  { month: "May 2025", pool: "£7,960", entries: 2614, winners: 7,  status: "Closed", topPrize: "£2,500" },
  { month: "Apr 2025", pool: "£7,200", entries: 2390, winners: 7,  status: "Closed", topPrize: "£2,000" },
  { month: "Mar 2025", pool: "£6,580", entries: 2108, winners: 7,  status: "Closed", topPrize: "£2,000" },
  { month: "Feb 2025", pool: "£5,900", entries: 1870, winners: 7,  status: "Closed", topPrize: "£1,800" },
];

const MOCK_CLAIMS = [
  { id: "CLM-001", user: "James Davies",  draw: "May 2025", prize: "£130",   submitted: "Jun 3",  status: "Paid"    },
  { id: "CLM-002", user: "Tom Harrington",draw: "May 2025", prize: "£2,500", submitted: "Jun 1",  status: "Pending" },
  { id: "CLM-003", user: "Priya Nair",    draw: "May 2025", prize: "£600",   submitted: "Jun 4",  status: "Pending" },
  { id: "CLM-004", user: "Sarah Kimura",  draw: "Apr 2025", prize: "£130",   submitted: "May 5",  status: "Paid"    },
  { id: "CLM-005", user: "Emily Foster",  draw: "Mar 2025", prize: "£130",   submitted: "Apr 6",  status: "Paid"    },
];

const GROWTH_DATA = [180, 220, 290, 380, 470, 580, 640, 740, 890, 1100, 1480, 2400];
const REVENUE_DATA = [1200, 1540, 2100, 2780, 3400, 4100, 4820, 5600, 6500, 7800, 9200, 11400];
const SCORES_DATA  = [340, 480, 620, 780, 1020, 1340, 1680, 2100, 2640, 3180, 3920, 4890];


/* ═══════════════════════════════════════════
   SECTION 2 — USER MANAGEMENT
═══════════════════════════════════════════ */
function UserManagement() {
  const [users,setusers] = useState(null)
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(null);

  useEffect(()=>{
    const fetchdata = async()=>{
      try {
        const result = await fetchusers()
        setusers(result.data.data)
      } catch (error) {
        console.log(error.response.data);
      }
    }
    if(!users){
      fetchdata()
    }
  },[])

  if(!users){
    return(
      <div className="font-display animate-pulse text-3xl">loading users data...</div>
    )
  }

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || u.status === filter;
    return matchSearch && matchFilter;
  });

  const statusFilters = ["All", "Active", "Inactive", "Suspended", "Pending"];

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={<Users size={15} />} title="User Management"
        sub="View, search and manage all StrokePlay members." />

      {/* Summary row */}
      <div className="grid grid-cols-4 gap-3 mb-5">
        {[
          { label: "Total",     value: users.length,                           color: "#00C46A" },
          { label: "Active",    value: users.filter(u=>u.status==="Active").length,    color: "#00E57A" },
          { label: "Inactive",  value: users.filter(u=>u.status==="Inactive").length,  color: "rgba(255,255,255,.4)" },
          { label: "Suspended", value: users.filter(u=>u.status==="Suspended").length, color: "#f87171" },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-4 py-3 text-center">
            <div className="font-display text-[1.5rem] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[.73rem] text-white/40 uppercase tracking-[.06em]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + filter bar */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex-1 relative min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input className="sp-input pl-9" placeholder="Search by name or email…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="flex gap-1.5">
          {statusFilters.map(f => (
            <button key={f} className={`tab-btn ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
        <button className="btn-ghost px-3 py-2 text-[.82rem] flex items-center gap-2">
          <Download size={14} /> Export
        </button>
      </div>

      {/* Users table */}
      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              {["Member",  "Status", "Joined", ""].map(h => (
                <th key={h} className="px-4 py-3 text-left text-[.72rem] text-white/35 font-semibold uppercase tracking-[.06em] whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <>
                <tr key={u.id} className="score-row cursor-pointer"
                  style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}
                  onClick={() => setExpanded(expanded === u.id ? null : u.id)}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-[.65rem] font-bold text-[#061209] flex-shrink-0"
                        style={{ background: "linear-gradient(135deg,#00C46A,#00E57A)" }}>
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <div className="text-[.86rem] font-medium text-[#e8f0eb]">{u.name}</div>
                        <div className="text-[.72rem] text-white/35">{u.email}</div>
                      </div>
                    </div>
                  </td>
                
                  <td className="px-4 py-3"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3 text-[.83rem] text-white/45">{u.joined}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-white/30">
                      {expanded === u.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </div>
                  </td>
                </tr>

                {/* Expanded row */}
                <AnimatePresence>
                  {expanded === u.id && (
                    <tr key={`exp-${u.id}`}>
                      <td colSpan={8} className="px-0 py-0">
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.22 }}
                          className="px-6 py-4 flex gap-5 flex-wrap"
                          style={{ background: "rgba(0,196,106,.03)", borderBottom: "1px solid rgba(0,196,106,.08)" }}>
                          <div className="flex-1 min-w-[200px]">
                            <Label>Quick Actions</Label>
                            <div className="flex gap-2 flex-wrap mt-1">
                              <button className="btn-ghost px-3 py-1.5 text-[.78rem]">
                                <Eye size={13} /> View Profile
                              </button>
                              <button className="btn-ghost px-3 py-1.5 text-[.78rem]">
                                <RefreshCw size={13} /> Reset Password
                              </button>
                              {u.status === "Suspended" ? (
                                <button className="btn-ghost px-3 py-1.5 text-[.78rem] text-[#00C46A]">
                                  <CheckCircle size={13} /> Reinstate
                                </button>
                              ) : (
                                <button className="px-3 py-1.5 text-[.78rem] rounded-lg flex items-center gap-1.5"
                                  style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171" }}>
                                  <XCircle size={13} /> Suspend
                                </button>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-6 text-[.82rem]">
                            <div><div className="text-white/35 mb-0.5">Email</div><div className="text-[#e8f0eb]">{u.email}</div></div>
                            
                          </div>
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/30 text-[.9rem]">No members match your search.</div>
        )}
      </div>

      <div className="text-[.78rem] text-white/25 mt-3">
        Showing {filtered.length} of {users.length} members
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — DRAW MANAGEMENT
═══════════════════════════════════════════ */
function DrawManagement() {
  const [confirmClose, setConfirmClose] = useState(false);
  const [draws,setdraws] = useState(null)

  useEffect(()=>{
    const fetchdata = async()=>{
      try {
        const result = await fetchdraws()
        setdraws(result.data.data)
      } catch (error) {
        console.log(error.response.data);
      }
    }
    if(!draws){
      fetchdata()
    }
  })

  if(!draws){
    return(
      <div className="font-display text-3xl animate-pulse">Loading pooling data...</div>
    )
  }

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={<Gift size={15} />} title="Draw Management"
        sub="Monitor and administer the monthly prize draw." />

      {/* Active draw card */}
      <div className="glass-gold rounded-2xl px-6 py-6 mb-6">
        <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
          <div>
            <div className="font-display font-bold text-[1.1rem] text-[#f0f4f1] mb-1">{draws.activepool.resultdate} Draw</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#00C46A] pulse-dot" />
              <span className="text-[.8rem] text-[#00C46A] font-semibold">Live · Result on {draws.activepool.resultdate}  2025</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-5">
          {[
            { label: "Prize Pool",    value: `$${draws.activepool.amount}`,  color: "#FFB800" },
          ].map(s => (
            <div key={s.label} className="rounded-xl px-4 py-3 text-center"
              style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)" }}>
              <div className="font-display text-[1.5rem] font-extrabold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[.73rem] text-white/40 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Prize breakdown */}
        <div>
          <div className="text-[.75rem] text-white/40 uppercase tracking-[.08em] mb-2">Prize Structure</div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { place:"1st", prize:`$${(draws.activepool.amount * 0.4).toFixed(2)}`, icon:"🏆" },
              { place:"2nd", prize:`$${(draws.activepool.amount * 0.35).toFixed(2)}`, icon:"🥈" },
              { place:"3rd", prize:`$${(draws.activepool.amount * 0.25).toFixed(2)}`,   icon:"🥉" },
            ].map(p => (
              <div key={p.place} className="rounded-lg px-3 py-2.5 text-center"
                style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
                <div className="text-lg mb-1">{p.icon}</div>
                <div className="font-display font-bold text-[#FFB800] text-[.85rem]">{p.prize}</div>
                <div className="text-[.7rem] text-white/35">{p.place}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirm close modal */}
      <AnimatePresence>
        {confirmClose && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4"
            onClick={() => setConfirmClose(false)}>
            <motion.div initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              className="glass rounded-2xl px-8 py-7 max-w-[400px] w-full text-center"
              onClick={e => e.stopPropagation()}>
              <AlertTriangle size={36} className="text-[#FFB800] mx-auto mb-4" />
              <div className="font-display font-bold text-[1.05rem] text-[#f0f4f1] mb-2">Close this draw?</div>
              <p className="text-[.85rem] text-white/50 mb-6">This will lock entries and prepare the draw for the prize selection. This cannot be undone.</p>
              <div className="flex gap-3 justify-center">
                <button className="btn-ghost px-5 py-2" onClick={() => setConfirmClose(false)}>Cancel</button>
                <button className="btn-em px-5 py-2" onClick={() => setConfirmClose(false)}>
                  <Ic d={ic.check} size={15} stroke="#061209" sw={2.5} /> Confirm Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Draw history */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
          <div className="font-display font-bold text-[.95rem] text-[#f0f4f1]">Draw History</div>
        </div>
        <table className="w-full" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
              {["Month", "Prize Pool","Top Prize", "Status"].map(h => (
                <th key={h} className="px-5 py-2.5 text-left text-[.72rem] text-white/35 font-semibold uppercase tracking-[.06em]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {draws.poolhistory.map((d, i) => (
              <tr key={i} className="score-row" style={{ borderBottom: "1px solid rgba(255,255,255,.04)" }}>
                <td className="px-5 py-3 text-[.88rem] font-medium text-[#e8f0eb]">{d.month}</td>
                <td className="px-5 py-3 font-display font-bold text-[.9rem] text-[#FFB800]">{d.pool}</td>
                <td className="px-5 py-3 font-display font-bold text-[.88rem] text-[#00C46A]">{(d.pool * 0.4).toFixed(2)}</td>
                <td className="px-5 py-3">
                  <span className={`badge ${d.status === "Open" ? "badge-green" : "badge-grey"}`}>{d.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4 — CLAIMS REVIEW
═══════════════════════════════════════════ */
function ClaimsReview() {
  const [claims, setClaims] = useState(MOCK_CLAIMS);

  const approve = id => setClaims(prev => prev.map(c => c.id === id ? { ...c, status: "Paid" } : c));
  const reject  = id => setClaims(prev => prev.filter(c => c.id !== id));

  return (
    <motion.div variants={sectionVariants} initial="hidden" animate="visible" exit="exit">
      <SectionTitle icon={<ShieldCheck size={15} />} title="Claims Review"
        sub="Approve or reject winner prize claims." />

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Total Claims", value: claims.length,                        color: "#00C46A" },
          { label: "Pending",      value: claims.filter(c=>c.status==="Pending").length, color: "#FFB800" },
          { label: "Paid",         value: claims.filter(c=>c.status==="Paid").length,    color: "#00E57A" },
        ].map(s => (
          <div key={s.label} className="glass rounded-xl px-5 py-4 text-center">
            <div className="font-display text-[1.7rem] font-extrabold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[.73rem] text-white/40 uppercase tracking-[.06em] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Claims list */}
      <div className="flex flex-col gap-3">
        {claims.map((c, i) => (
          <motion.div key={c.id} layout variants={fadeUp} custom={i * 0.05}
            className={`glass rounded-2xl px-5 py-4 flex flex-wrap items-center gap-4 ${c.status === "Pending" ? "border border-[rgba(255,184,0,.15)]" : ""}`}>
            {/* ID + user */}
            <div className="flex items-center gap-3 flex-1 min-w-[200px]">
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-[.7rem] font-bold text-[#061209] flex-shrink-0"
                style={{ background: "linear-gradient(135deg,#FFB800,#FFD700)" }}>
                {c.user.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <div className="text-[.88rem] font-semibold text-[#f0f4f1]">{c.user}</div>
                <div className="text-[.72rem] text-white/35">{c.id} · {c.draw} draw</div>
              </div>
            </div>

            {/* Prize */}
            <div className="text-center">
              <div className="font-display text-[1.2rem] font-extrabold text-[#FFB800]">{c.prize}</div>
              <div className="text-[.72rem] text-white/35">Prize amount</div>
            </div>

            {/* Submitted */}
            <div className="text-center">
              <div className="text-[.85rem] text-[#e8f0eb]">{c.submitted}</div>
              <div className="text-[.72rem] text-white/35">Submitted</div>
            </div>

            {/* Status + actions */}
            <div className="flex items-center gap-2.5 ml-auto">
              <StatusBadge status={c.status} />
              {c.status === "Pending" && (
                <>
                  <button className="btn-em px-3 py-1.5 text-[.8rem]" onClick={() => approve(c.id)}>
                    <Ic d={ic.check} size={13} stroke="#061209" sw={2.5} /> Approve
                  </button>
                  <button className="px-3 py-1.5 text-[.8rem] rounded-lg flex items-center gap-1.5"
                    style={{ background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.2)", color: "#f87171" }}
                    onClick={() => reject(c.id)}>
                    <Ic d={ic.x} size={13} stroke="#f87171" sw={2.5} /> Reject
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   SIDEBAR
═══════════════════════════════════════════ */
const navItems = [
  { id: "users",     label: "Users",          icon: <Users size={16} />        },
  { id: "draws",     label: "Draw Mgmt",      icon: <Gift size={16} />         },
  { id: "claims",    label: "Claims Review",  icon: <ShieldCheck size={16} />  },
];

function Sidebar({ active, setActive, mobile, username }) {
  const { signOut } = useClerk();
  const pendingClaims = MOCK_CLAIMS.filter(c => c.status === "Pending").length;

  return (
    <div className={`sidebar ${mobile ? "open" : ""} flex flex-col h-screen sticky top-0 overflow-y-auto flex-shrink-0 px-3`}
      style={{ width: 230, background: "rgba(8,11,9,0.97)", backdropFilter: "blur(24px)", borderRight: "1px solid rgba(255,255,255,.06)" }}>

      {/* Logo + admin badge */}
      <div className="px-1.5 pt-5 pb-5 mb-3" style={{ borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-[30px] h-[30px] rounded-[7px] flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#00C46A,#00e07a)" }}>
            <Apple color="black" size={16} />
          </div>
          <div>
            <span className="font-display text-base font-extrabold text-[#f0f4f1]">
              Stroke<span className="text-[#00C46A]">Play</span>
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck size={10} className="text-[#FFB800]" />
              <span className="text-[.6rem] text-[#FFB800] font-semibold tracking-[.06em] uppercase">Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="flex-1 flex flex-col gap-1">
        <div className="text-[.67rem] font-bold text-white/25 uppercase px-3.5 pt-2 pb-1">Admin Panel</div>
        {navItems.map(item => (
          <div key={item.id}
            className={`flex gap-2 items-center cursor-pointer hover:scale-[1.02] hover:bg-emerald-400/10 rounded-[6px] px-3 py-2.5 transition-all text-[.875rem] font-medium ${active === item.id ? "bg-emerald-900/60 text-[#00C46A]" : "text-white/45"}`}
            onClick={() => setActive(item.id)}>
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.id === "claims" && pendingClaims > 0 && (
              <span className="badge badge-gold text-[.6rem] px-1.5 py-0.5">{pendingClaims}</span>
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
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck size={10} className="text-[#FFB800]" />
              <span className="text-[.7rem] text-[#FFB800]">Administrator</span>
            </div>
          </div>
        </div>
        <button className="flex w-full gap-2 items-center cursor-pointer hover:bg-red-400/10 p-2 rounded-[4px] text-red-400/60 text-[.875rem]"
          onClick={async () => { await signOut(); }}>
          <LogOut size={16} /> Log Out
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT ADMIN DASHBOARD
═══════════════════════════════════════════ */
export default function AdminDashboard() {
  const [active, setActive] = useState("users");
  const [mobileNav, setMobileNav] = useState(false);
  const { user } = useUser();

  const renderSection = () => {
    switch (active) {
      case "users":     return <UserManagement />;
      case "draws":     return <DrawManagement />;
      case "claims":    return <ClaimsReview />;
      default:          return <UserManagement setActive={setActive} />;
    }
  };

  const currentLabel = navItems.find(n => n.id === active)?.label ?? "Admin Dashboard";
  const pendingClaims = MOCK_CLAIMS.filter(c => c.status === "Pending").length;

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-[#080b09]">

        {/* Sidebar desktop */}
        <Sidebar username={user?.firstName ?? "Admin"} active={active}
          setActive={id => { setActive(id); setMobileNav(false); }} />

        {/* Mobile overlay */}
        <AnimatePresence>
          {mobileNav && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 z-[199]" onClick={() => setMobileNav(false)} />
              <Sidebar username={user?.firstName ?? "Admin"} active={active}
                setActive={id => { setActive(id); setMobileNav(false); }} mobile />
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
                <Menu size={20} />
              </button>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-[.97rem] text-[#f0f4f1]">{currentLabel}</span>
                <span className="badge badge-gold text-[.6rem] px-1.5 py-0.5 flex items-center gap-1">
                  <ShieldCheck size={9} /> Admin
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              {/* Notification with pending badge */}
              <div className="relative">
                <button className="btn-ghost p-[7px]"><Bell size={17} /></button>
                {pendingClaims > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#FFB800] flex items-center justify-center text-[.55rem] font-bold text-[#1a0d00]">
                    {pendingClaims}
                  </div>
                )}
              </div>
              <UserButton />
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
