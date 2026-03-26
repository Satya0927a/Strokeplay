import { Apple, ArrowRight, ChartArea, Gift, Heart, Shield } from "lucide-react";
import RevealOnScroll from "../RevealOnscroll";

const HowItWorks = ()=> {
  const steps = [
    { n:"01", icon:<Shield/>, title:"Subscribe", desc:"Choose a monthly or yearly plan. A slice of every subscription goes directly to your chosen charity.", color:"#00C46A" },
    { n:"02", icon:<ChartArea/>,  title:"Log Your Scores", desc:"Enter your Stableford points after each round. Track handicap progress and performance trends over time.", color:"#00E57A" },
    { n:"03", icon:<Gift color="gold"/>,   title:"Enter the Draw", desc:"Every score you submit earns entries into our monthly draw. The more you play, the better your odds.", color:"#FFB800" },
    { n:"04", icon: <Heart  color=" red"fill="red"/>, title:"Make an Impact", desc:"Watch your subscription fuel real change. Choose from our curated charities and see donations in real time.", color:"#00C46A" },
  ];

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <RevealOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
            <span className="text-[.75rem] text-[#00C46A] tracking-[.12em] uppercase font-semibold">How It Works</span>
            <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
          </div>
          <h2 className="font-display font-extrabold m-0 mb-4 leading-[1.1]" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Four Steps to<br/><span className="text-[#00C46A]">Everything</span>
          </h2>
          <p className="text-white/45 max-w-[480px] mx-auto text-base leading-[1.7]">
            StrokePlay turns your Sunday round into something that matters far beyond the 18th hole.
          </p>
        </RevealOnScroll>

        {/* Steps grid */}
        <div className="grid gap-5 relative" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))" }}>
          {steps.map((s, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="glass card-lift p-8 rounded-2xl relative cursor-default h-full">
                {/* Step number bg */}
                <div className="font-display absolute top-4 right-5 text-[4rem] font-extrabold text-white/[0.03] leading-none select-none">{s.n}</div>

                {/* Icon */}
                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-6"
                  style={{
                    background: `rgba(${s.color==="#FFB800"?"255,184,0":"0,196,106"},.1)`,
                    border: `1px solid rgba(${s.color==="#FFB800"?"255,184,0":"0,196,106"},.2)`,
                  }}>
                    {s.icon}
                </div>

                <div className="font-display text-[.72rem] tracking-[.1em] uppercase mb-2.5 font-bold" style={{ color: s.color }}>
                  Step {s.n}
                </div>
                <h3 className="font-display text-[1.25rem] font-bold m-0 mb-3 text-[#f0f4f1]">{s.title}</h3>
                <p className="text-white/45 text-[.9rem] leading-[1.7] m-0">{s.desc}</p>

                {/* Connector arrow */}
                {i < steps.length - 1 && (
                  <div className="absolute top-8 right-[-14px] z-[1] w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "#0d1210", border: "1px solid rgba(0,196,106,.2)" }}>
                      <ArrowRight/>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks