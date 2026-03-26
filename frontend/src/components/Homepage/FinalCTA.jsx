import { ArrowRight, Check } from "lucide-react";
import RevealOnScroll from "../RevealOnscroll";

const FinalCTA = ()=> {
  return (
    <section className="py-20 px-6 pb-24">
      <div className="max-w-[900px] mx-auto">
        <RevealOnScroll>
          <div className="glass glow-em rounded-3xl text-center relative overflow-hidden" style={{ padding: "clamp(40px,6vw,72px) clamp(28px,6vw,80px)", border: "1px solid rgba(0,196,106,0.18)" }}>
            {/* Glow orb inside card */}
            <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(0,196,106,0.18) 0%, transparent 70%)", filter: "blur(30px)" }}/>

            <div className="relative z-[1]">
              <div className="inline-flex items-center gap-2 mb-5">
                <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
                <span className="text-[.75rem] text-[#00C46A] tracking-[.12em] uppercase font-semibold">Join StrokePlay</span>
                <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
              </div>

              <h2 className="font-display font-extrabold leading-[1.08] m-0 mb-5" style={{ fontSize: "clamp(2.2rem,5vw,3.8rem)" }}>
                Your Next Round<br/>Could Change <span className="text-[#00C46A]">Everything</span>
              </h2>

              <p className="text-white/45 text-[1.05rem] leading-[1.7] mx-auto mb-10 max-w-[480px]">
                Join 2,400+ golfers already tracking, giving and winning. First month free, cancel anytime.
              </p>

              <div className="flex flex-wrap gap-3.5 justify-center mb-7">
                <button className="btn-em px-9 py-4 text-[1.05rem]">
                  <span className="flex items-center gap-2">
                    Start Free Trial <ArrowRight/>
                  </span>
                </button>
                <button className="btn-outline px-7 py-4 text-[1.05rem]">
                  View Pricing
                </button>
              </div>

              <div className="flex flex-wrap justify-center gap-6">
                {["No setup fees","Cancel anytime","First month free","Charity donation included"].map((t,i)=>(
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,196,106,.15)" }}>
                      <Check/>
                    </div>
                    <span className="text-[.82rem] text-white/40">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

export default FinalCTA