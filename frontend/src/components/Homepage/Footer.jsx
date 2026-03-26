import { Apple } from "lucide-react";

const Footer = () => {
  const cols = [
    { heading: "Product", links: ["Features", "Pricing", "Monthly Draw", "Charity Partners", "Leaderboards"] },
    { heading: "Company", links: ["About Us", "Blog", "Careers", "Press", "Contact"] },
    { heading: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Draw Rules"] },
  ];

  return (
    <footer className="border-t border-white/[0.06] pt-[60px] pb-8 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid gap-10 mb-[50px]" style={{ gridTemplateColumns: "1.6fr 1fr 1fr 1fr" }}>

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-[18px]">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00C46A,#00e07a)" }}>
                <Apple color="black" />
              </div>
              <span className="font-display text-[1.1rem] font-extrabold">Stroke<span className="text-[#00C46A]">Play</span></span>
            </div>
            <p className="text-white/35 text-[.88rem] leading-[1.75] max-w-[260px] m-0 mb-6">
              Golf performance tracking meets charity fundraising and monthly prize draws. Play better. Give back. Win big.
            </p>
            <div className="flex gap-2.5">
              {["tw", "ig", "fb", "li"].map(s => (
                <div key={s} className="glass w-9 h-9 rounded-[9px] flex items-center justify-center cursor-pointer transition-[border-color] duration-200">
                  <span className="text-[.7rem] text-white/40 font-bold uppercase">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {cols.map(col => (
            <div key={col.heading}>
              <div className="font-display text-[.8rem] font-bold text-white/50 uppercase tracking-[.1em] mb-[18px]">{col.heading}</div>
              <div className="flex flex-col gap-[11px]">
                {col.links.map(l => (
                  <a key={l} href="#" className="text-white/38 no-underline text-[.87rem] transition-colors duration-200 hover:text-[#00C46A]">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-6 flex flex-wrap justify-between items-center gap-3">
          <p className="m-0 text-[.8rem] text-white/25">
            © 2025 StrokePlay Ltd. All rights reserved. Registered in England &amp; Wales.
          </p>
          <div className="flex gap-1.5 items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#00C46A] anim-pulse-orb" />
            <span className="text-[.78rem] text-white/30">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer