import { ArrowRight, ChartArea, Globe, Shield, Trophy, User, Zap } from "lucide-react";
import RevealOnScroll from "../RevealOnscroll";

const FeaturesHighlight = ()=> {
  const features = [
    { icon:<ChartArea/>,  title:"Stableford Tracking", desc:"Intuitive score logging with automatic handicap calculations and round history." },
    { icon:<User/>,  title:"Community Leaderboards", desc:"Compete locally or nationally. See how your game stacks up against members." },
    { icon:<Globe/>,  title:"Charity Dashboard", desc:"Real-time visibility of exactly where your subscription money is going." },
    { icon:<Trophy/>, title:"Draw History", desc:"Full transparency. Every draw result archived, verified and published publicly." },
    { icon:<Zap/>,    title:"Performance Insights", desc:"Smart analytics that identify your strengths, weaknesses, and improvement paths." },
    { icon:<Shield/>, title:"Secure & Transparent", desc:"Bank-grade security with fully auditable charity distribution records." },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-300 mx-auto">
        <div className="grid gap-20 items-center" style={{ gridTemplateColumns: "1fr 1.4fr" }}>

          {/* Left text */}
          <RevealOnScroll>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
              <span className="text-[.75rem] text-[#00C46A] tracking-[.12em] uppercase font-semibold">Platform Features</span>
            </div>
            <h2 className="font-display font-extrabold leading-[1.1] m-0 mb-5" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
              Everything Your<br/>Game <span className="text-[#00C46A]">Deserves</span>
            </h2>
            <p className="text-white/45 leading-[1.75] mb-9 text-base max-w-95">
              Built for golfers who want more than just a scorecard — a platform that connects performance, purpose and reward.
            </p>
            <a href="/features" className="no-underline">
              <button className="btn-em px-7 py-3 text-[.95rem]">
                <span className="flex items-center gap-2">
                  Explore All Features <ArrowRight/>
                </span>
              </button>
            </a>
          </RevealOnScroll>

          {/* Right grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((f, i) => (
              <RevealOnScroll key={i} delay={i * 0.07}>
                <div className="glass card-lift p-5 rounded-2xl h-full">
                  <div className="w-10 h-10 rounded-[10px] flex items-center justify-center mb-4"
                    style={{ background: "rgba(0,196,106,.08)", border: "1px solid rgba(0,196,106,.15)" }}>
                      {f.icon}
                  </div>
                  <h4 className="font-display text-[.95rem] font-bold m-0 mb-2 text-[#f0f4f1]">{f.title}</h4>
                  <p className="text-white/40 text-[.82rem] leading-[1.6] m-0">{f.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesHighlight