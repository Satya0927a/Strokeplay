import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Homepage/Navbar";
import PricingCard from "../components/Pricingpage/Pricingcard";
import { Check, Heart, Shield, Trophy } from "lucide-react";

export default function PricingPage({userdata,setuserdata}) {
  const [billing, setBilling] = useState("monthly"); // "monthly" | "yearly"
  const isYearly = billing === "yearly";

  const plans = [
    {
      key: "monthly",
      label: "Monthly",
      name: "StrokePlay Monthly",
      price: 14.99,
      priceSuffix: "/ month",
      note: null,
      cta: "Start Monthly Plan",
    },
    {
      key: "yearly",
      label: "Yearly · 20% Off",
      name: "StrokePlay Yearly",
      price: 11.99,
      priceSuffix: "/ month",
      note: "Save 20%",
      cta: "Start Yearly Plan",
    },
  ];


  return (
    <section>
      <Navbar/>
      <div className="min-h-screen mesh-page text-[#f0f4f1] px-6 py-20">

        {/* Background orbs */}
        <div
          className="fixed top-[10%] left-[5%] w-[500px] h-[500px] rounded-full pointer-events-none anim-pulse-orb"
          style={{ background: "radial-gradient(circle, rgba(0,196,106,0.09) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="fixed bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none anim-pulse-orb"
          style={{ background: "radial-gradient(circle, rgba(255,184,0,0.07) 0%, transparent 70%)", filter: "blur(60px)", animationDelay: "2s" }}
        />

        <div className="max-w-[900px] mx-auto relative z-[1]">

          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-14"
          >

            <h1 className="font-display font-extrabold leading-[1.08] m-0 mb-4" style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)" }}>
              One Plan.<br/>
              <span className="shimmer-text">Every Feature.</span>
            </h1>
            <p className="text-white/45 text-[1.05rem] leading-[1.7] max-w-[440px] mx-auto m-0">
              Track, give back, and win — choose the billing cycle that suits you best.
            </p>
          </motion.div>

          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <PricingCard
              plan={isYearly ? plans[0] : plans[0]}
              accent="#00C46A"
              isYearly={false}
              userdata={userdata}
              setuserdata={setuserdata}
            />
            <PricingCard
              plan={isYearly ? plans[1] : plans[1]}
              accent="#FFB800"
              isYearly={true}
              userdata={userdata}
              setuserdata={setuserdata}
            />
          </div>

          {/* ── Trust strip ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-6 mt-12"
          >
            {[
              { icon: <Shield/>, text: "Bank-grade security" },
              { icon: <Heart/>,  text: "10% to charity monthly" },
              { icon: <Trophy/>, text: "Monthly prize draw" },
              { icon: <Check/>,  text: "Cancel anytime" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{ background: "rgba(0,196,106,.1)", border: "1px solid rgba(0,196,106,.2)" }}
                >
                  {t.icon}
                </div>
                <span className="text-[.8rem] text-white/40">{t.text}</span>
              </div>
            ))}
          </motion.div>

          {/* ── Bottom note ── */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="text-center text-[.75rem] text-white/20 mt-8 m-0"
          >
            Prices shown in GBP. VAT may apply. © 2025 StrokePlay Ltd.
          </motion.p>

        </div>
      </div>

      <style>{`
        @media (max-width: 680px) {
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}