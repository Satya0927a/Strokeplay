import { Heart } from "lucide-react";
import RevealOnScroll from "../RevealOnscroll";

const CharityImpact = ()=> {
  const charities = [
    { name:"Cancer Research UK", raised:"£12,400", members:380, cat:"Health", color:"#00C46A" },
    { name:"Teenage Cancer Trust", raised:"£9,200",  members:292, cat:"Youth",  color:"#00E57A" },
    { name:"Golf Foundation",     raised:"£8,100",  members:264, cat:"Sport",  color:"#00C46A" },
  ];

  return (
    <section className="mesh-charity py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-20 items-center" style={{ gridTemplateColumns: "1.3fr 1fr" }}>

          {/* Left – cards */}
          <RevealOnScroll className="flex flex-col gap-4">
            {charities.map((c, i) => (
              <div key={i} className="glass card-lift p-5 px-6 rounded-2xl flex items-center gap-5">
                <div className="w-[52px] h-[52px] rounded-[14px] flex-shrink-0 flex items-center justify-center"
                  style={{ background: "rgba(0,196,106,.1)", border: "1px solid rgba(0,196,106,.2)" }}>
                    <Heart/>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-display font-bold text-[#f0f4f1] text-[.95rem] mb-0.5">{c.name}</div>
                      <div className="text-[.75rem] text-white/35 uppercase tracking-[.06em]">{c.cat} · {c.members} members</div>
                    </div>
                    <div className="font-display text-[1.2rem] font-extrabold" style={{ color: c.color }}>{c.raised}</div>
                  </div>
                  <div className="mt-3 h-1 rounded-full bg-white/[0.05]">
                    <div className="h-full rounded-full" style={{ width: `${60+i*10}%`, background: `linear-gradient(90deg, ${c.color}60, ${c.color})` }}/>
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="glass-em p-5 px-6 rounded-2xl flex justify-between items-center">
              <div>
                <div className="text-[.78rem] text-white/45 uppercase tracking-[.08em] mb-1">Total Raised to Date</div>
                <div className="font-display text-[2rem] font-extrabold text-[#00C46A]">£42,600</div>
              </div>
              <div className="text-right">
                <div className="text-[.78rem] text-white/45 mb-1">Across 18 charities</div>
                <div className="flex items-center gap-1.5 justify-end">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00C46A] anim-pulse-orb"/>
                  <span className="text-[.78rem] text-[#00C46A] font-semibold">Growing monthly</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right text */}
          <RevealOnScroll delay={0.15}>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
              <span className="text-[.75rem] text-[#00C46A] tracking-[.12em] uppercase font-semibold">Charity Impact</span>
            </div>
            <h2 className="font-display font-extrabold leading-[1.1] m-0 mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Every Swing<br/><span className="text-[#00C46A]">Changes Lives</span>
            </h2>
            <p className="text-white/45 leading-[1.75] text-base mb-7">
              10% of every subscription goes to your chosen charity — not at the end of the year, not as a promise, but monthly, automatically, transparently.
            </p>
            <p className="text-white/35 leading-[1.75] text-[.92rem] mb-10">
              You choose who you support. You see exactly how much you've given. You watch the impact grow with every round you play.
            </p>
            <a href="/charities" className="no-underline">
              <button className="btn-em px-7 py-3 text-[.95rem]">
                <span className="flex items-center gap-2">
                  Browse Charities <Heart fill="red" color="red"/>
                </span>
              </button>
            </a>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}

export default CharityImpact