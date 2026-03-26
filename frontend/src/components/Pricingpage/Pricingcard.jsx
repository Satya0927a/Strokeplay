import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChartArea, Gift, Heart, Shield, Star, Trophy, Zap } from "lucide-react";
import { renewsubs } from "../../services/api";
import { useNavigate } from "react-router-dom";



const features = [
  { icon: <ChartArea/>,  text: "Full Stableford score tracking & handicap history" },
  { icon: <Trophy/>, text: "Automatic monthly prize draw entries" },
  { icon: <Heart/>,  text: "10% of subscription donated to your chosen charity" },
  { icon: <Gift/>,   text: "Community leaderboards — local & national" },
  { icon: <Shield/>, text: "Charity dashboard with real-time donation tracking" },
  { icon: <Zap/>,    text: "Performance insights & improvement analytics" },
  { icon: <Star/>,   text: "Full draw history — transparent & publicly archived" },
];

/* ─────────────────────────────────────────────
   FEATURE ROW
───────────────────────────────────────────── */
function FeatureRow({ icon, text, delay, accent = "#00C46A" }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex items-start gap-3"
    >
      <div
        className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
        style={{ background: `rgba(${accent === "#FFB800" ? "255,184,0" : "0,196,106"},.1)`, border: `1px solid rgba(${accent === "#FFB800" ? "255,184,0" : "0,196,106"},.2)` }}
      >
        {icon}
      </div>
      <span className="text-[.88rem] text-white/60 leading-[1.6]">{text}</span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PRICING CARD
───────────────────────────────────────────── */
const PricingCard = ({ plan, accent, isYearly ,userdata,setuserdata})=> {
  const isGold = accent === "#FFB800";
  const navigate = useNavigate()

  async function handlesubsrenew (){
    let planId
    if(plan.key == "monthly"){
      planId = "69c366a8b6024e3b7d502d74"
    }
    else{
      planId = '69c366a8b6024e3b7d502d74'
    }
    try {
      const result = await renewsubs(planId)
      setuserdata({
        ...userdata,
        plan:result.data.data.planId
      })
      navigate("/dashboard")
    } catch (error) {
      console.log(error.response.data);
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: isGold ? 0.1 : 0 }}
      className={`relative rounded-3xl overflow-hidden flex flex-col ${isGold ? "glow-gold" : "glow-em"}`}
      style={{ border: `1px solid rgba(${isGold ? "255,184,0" : "0,196,106"},.22)` }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
    >
      {/* Card background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isGold
            ? "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,184,0,0.08) 0%, transparent 65%), rgba(255,255,255,0.02)"
            : "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,196,106,0.10) 0%, transparent 65%), rgba(255,255,255,0.02)",
          backdropFilter: "blur(24px)",
        }}
      />

      {/* BEST VALUE badge – yearly only */}
      {isGold && (
        <div className="absolute top-5 right-5">
          <div
            className="font-display text-[.65rem] font-bold tracking-[.12em] uppercase px-3 py-1 rounded-full"
            style={{ background: "linear-gradient(135deg,#FFB800,#FFD700)", color: "#1a0d00" }}
          >
            Best Value
          </div>
        </div>
      )}

      <div className="relative z-[1] p-8 flex flex-col gap-8 h-full">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: `rgba(${isGold ? "255,184,0" : "0,196,106"},.12)`, border: `1px solid rgba(${isGold ? "255,184,0" : "0,196,106"},.25)` }}
            >
              {isGold? <Star/> : <Zap/>}
            </div>
            <div>
              <div className="font-display text-[.7rem] font-bold tracking-[.12em] uppercase mb-0.5" style={{ color: accent }}>
                {plan.label}
              </div>
              <div className="font-display text-base font-extrabold text-[#f0f4f1]">{plan.name}</div>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2 mb-2">
            <motion.div
              key={plan.price}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(2.8rem,5vw,3.8rem)", color: accent }}
            >
              ${plan.price}
            </motion.div>
            <div className="mb-2">
              <div className="text-[.78rem] text-white/40 font-medium">{plan.priceSuffix}</div>
            </div>
          </div>

          {/* Yearly equiv / savings note */}
          <AnimatePresence mode="wait">
            {plan.note && (
              <motion.div
                key={plan.note}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="flex items-center gap-2 mt-2"
              >
                <div
                  className="text-[.75rem] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{ background: `rgba(${isGold ? "255,184,0" : "0,196,106"},.12)`, color: accent }}
                >
                  {plan.note}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Yearly total line */}
          {isGold && (
            <div className="mt-3 text-[.8rem] text-white/35">
              Billed as <span className="text-white/55 font-medium">${plan.price * 12}</span> per year
              &nbsp;·&nbsp;
              <span style={{ color: accent }}>save ${(plan.price * 12 - 14.99*12).toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: `linear-gradient(90deg, rgba(${isGold?"255,184,0":"0,196,106"},.25), transparent)` }}/>

        {/* Features */}
        <div className="flex flex-col gap-3.5 flex-1">
          <div className="font-display text-[.72rem] font-bold tracking-[.1em] uppercase text-white/30 mb-1">
            Everything included
          </div>
          {features.map((f, i) => (
            <FeatureRow key={i} icon={f.icon} text={f.text} delay={i * 0.05} accent={accent}/>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <button onClick={handlesubsrenew}
            className={`${isGold ? "btn-gold" : "btn-em"} w-full py-4 text-base`}
          >
            <span className="flex items-center justify-center gap-2">
              {plan.cta}
              <ArrowRight/>
            </span>
          </button>
          <p className="text-center text-[.75rem] text-white/30 m-0">
            First month free · Cancel anytime · No setup fees
          </p>
        </div>

      </div>
    </motion.div>
  );
}

export default PricingCard