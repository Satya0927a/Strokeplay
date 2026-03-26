import {  Star } from "lucide-react";
import RevealOnScroll from "../RevealOnscroll";

const Testimonials = ()=> {
  const reviews = [
    {
      quote:"I've tried every golf app out there. StrokePlay is the first one that actually made me feel like my game meant something beyond the scorecard.",
      author:"Marcus D.", hcp:"Handicap 14", location:"Edinburgh, Scotland",
      initials:"MD", grad:["#00C46A","#00E57A"]
    },
    {
      quote:"The monthly draw keeps me motivated to get out even when the weather is grim. Won £130 in March — paid for a month's subscription many times over.",
      author:"Sarah K.", hcp:"Handicap 22", location:"Bristol, England",
      initials:"SK", grad:["#059669","#00C46A"]
    },
    {
      quote:"Knowing 10% goes to Cancer Research every month makes me recommend StrokePlay to everyone in my club. It's golf with a conscience.",
      author:"Tom H.", hcp:"Handicap 9", location:"Dublin, Ireland",
      initials:"TH", grad:["#00E57A","#10b981"]
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-[1200px] mx-auto">

        <RevealOnScroll className="text-center mb-[60px]">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
            <span className="text-[.75rem] text-[#00C46A] tracking-[.12em] uppercase font-semibold">Member Stories</span>
            <div className="w-6 h-px bg-[rgba(0,196,106,.4)]"/>
          </div>
          <h2 className="font-display font-extrabold m-0 leading-[1.1]" style={{ fontSize: "clamp(2rem,4vw,3rem)" }}>
            Golfers Who <span className="text-[#00C46A]">Get It</span>
          </h2>
        </RevealOnScroll>

        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
          {reviews.map((r, i) => (
            <RevealOnScroll key={i} delay={i * 0.1}>
              <div className="glass card-lift p-8 rounded-2xl flex flex-col gap-5 h-full">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_,j)=><Star key={j} fill="gold" color="gold"/>)}
                </div>
                <p className="text-white/65 text-[.95rem] leading-[1.75] m-0 italic">"{r.quote}"</p>
                <div className="flex items-center gap-3.5 mt-auto pt-2 border-t border-white/[0.06]">
                  <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-[.8rem] font-bold text-[#061209] flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${r.grad[0]}, ${r.grad[1]})` }}>
                    {r.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[#f0f4f1] text-[.92rem]">{r.author}</div>
                    <div className="text-[.75rem] text-white/35">{r.hcp} · {r.location}</div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials