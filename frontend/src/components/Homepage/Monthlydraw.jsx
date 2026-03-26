import { useEffect, useState } from "react";
import RevealOnScroll from "../RevealOnscroll";
import { Star, Trophy } from "lucide-react";

const MonthlyDraw = ()=> {
  const [time, setTime] = useState({ d:14, h:8, m:32, s:17 });

  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { d,h,m,s } = prev;
        s--;
        if(s<0){s=59;m--;}
        if(m<0){m=59;h--;}
        if(h<0){h=23;d--;}
        return {d,h,m,s};
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const prizes = [
    { place:"1st", amount:"£2,500", icon:"🏆", color:"#FFD700" },
    { place:"2nd", amount:"£1,200", icon:"🥈", color:"#C0C0C0" },
    { place:"3rd", amount:"£600",   icon:"🥉", color:"#CD7F32" },
  ];

  const pad = n => String(n).padStart(2,"0");

  return (
    <section className="mesh-draw py-24 px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute top-1/2 -right-[5%] -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(255,184,0,0.10) 0%, transparent 70%)", filter: "blur(60px)" }}/>

      <div className="max-w-[1200px] mx-auto relative z-[2]">
        <div className="draw-grid grid gap-[60px] items-center" style={{ gridTemplateColumns: "1fr 1fr" }}>

          {/* Left */}
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px" style={{ background: "rgba(255,184,0,.5)" }}/>
              <span className="text-[.75rem] text-[#FFB800] tracking-[.12em] uppercase font-semibold">Monthly Draw</span>
              <div className="w-6 h-px" style={{ background: "rgba(255,184,0,.5)" }}/>
            </div>

            <h2 className="font-display font-extrabold m-0 mb-5 leading-[1.1]" style={{ fontSize: "clamp(2rem,4vw,3.2rem)" }}>
              Your Round Could<br/><span className="text-[#FFB800]">Win Big</span> This Month
            </h2>

            <p className="text-white/45 text-base leading-[1.75] max-w-[420px] mb-10">
              Every Stableford score you log earns draw entries. Higher scores mean more entries. More entries mean more chances to win from our monthly prize pool.
            </p>

            {/* Countdown */}
            <div className="mb-9">
              <div className="text-[.75rem] text-white/40 tracking-[.08em] uppercase mb-3.5">Draw closes in</div>
              <div className="flex gap-3">
                {[["d",time.d],["h",time.h],["m",time.m],["s",time.s]].map(([unit,val])=>(
                  <div key={unit} className="glass-gold w-[70px] text-center py-3.5 px-2 rounded-xl">
                    <div className="font-display text-[1.8rem] font-extrabold text-[#FFB800] leading-none">{pad(val)}</div>
                    <div className="text-[.65rem] text-white/35 uppercase tracking-[.08em] mt-1">{unit}</div>
                  </div>
                ))}
              </div>
            </div>

            <button className="btn-em px-8 py-3.5 text-base" style={{ background: "linear-gradient(135deg,#FFB800,#FFD700)", color: "#1a0d00" }}>
              <span className="flex items-center gap-2">
                Enter This Month's Draw <Trophy/>
              </span>
            </button>
          </RevealOnScroll>

          {/* Right – Prize cards */}
          <RevealOnScroll delay={0.15}>
            <div className="flex flex-col gap-3.5">
              <div className="glass p-5 rounded-2xl" style={{ border: "1px solid rgba(255,184,0,.15)" }}>
                <div className="flex justify-between items-center mb-3.5">
                  <span className="font-display font-bold text-white/70 text-[.85rem]">Prize Breakdown</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C46A] anim-pulse-orb"/>
                    <span className="text-[.72rem] text-[#00C46A] font-semibold">Live Pool: <strong>£8,420</strong></span>
                  </div>
                </div>
                {prizes.map((p, i) => (
                  <div key={i} className="flex items-center justify-between px-3.5 py-3 rounded-[10px] mb-2"
                    style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(255,255,255,.05)" }}>
                    <div className="flex items-center gap-3">
                      <span className="text-[1.4rem]">{p.icon}</span>
                      <div className="font-display text-[.85rem] font-bold text-white/80">{p.place} Place</div>
                    </div>
                    <div className="font-display text-[1.1rem] font-extrabold" style={{ color: p.color }}>{p.amount}</div>
                  </div>
                ))}
              </div>

              {/* Entries boost */}
              <div className="glass-gold p-5 rounded-2xl">
                <div className="flex gap-3.5 items-center">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,184,0,.15)" }}>
                    <Star color="gold"/>
                  </div>
                  <div>
                    <div className="font-display text-base font-bold text-[#f0f4f1]">Boost Your Entries</div>
                    <div className="text-[.82rem] text-white/45 mt-0.5">
                      Score 36+ Stableford points to earn 3× draw entries
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </div>

      <style>{`@media (max-width:768px){ .draw-grid { grid-template-columns:1fr !important; } }`}</style>
    </section>
  );
}

export default MonthlyDraw