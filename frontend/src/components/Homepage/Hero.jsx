import { ArrowRight, Check, Star, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    }),
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: (delay = 0) => ({
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut", delay },
    }),
  };

  const floatA = {
    animate: {
      y: [0, -18, -8, 0],
      rotate: [0, 2, -1, 0],
      transition: { duration: 7, ease: "easeInOut", repeat: Infinity },
    },
  };

  const floatB = {
    animate: {
      y: [0, -14, -6, 0],
      rotate: [0, -2, 1, 0],
      transition: { duration: 9, ease: "easeInOut", repeat: Infinity, delay: 1.5 },
    },
  };
  return (
    <section className=" min-h-screen bg-[url(/Homepagebg.png)] bg-cover flex items-center relative overflow-hidden pt-[68px]">
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Background orbs */}
      <div className="anim-pulse-orb absolute top-[18%] left-[8%] w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,196,106,0.12) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="anim-pulse-orb absolute bottom-[15%] right-[6%] w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,122,0.08) 0%, transparent 70%)", filter: "blur(60px)", animationDelay: "2s", animationDuration: "5s" }} />

      {/* Floating glass card – prize pool */}
      <motion.div
        variants={floatA}
        animate="animate"
        className="glass absolute top-[22%] right-[4%] w-[200px] p-4 rounded-xl flex flex-col gap-2 pointer-events-none"
      >
        <div className="flex justify-between items-center">
          <span className="text-[.72rem] text-white/45 tracking-[.06em] uppercase">This Month's Pool</span>
          <span className="text-[.65rem] text-[#00C46A] font-semibold">LIVE</span>
        </div>
        <div className="font-display text-[1.7rem] font-extrabold text-[#FFB800]">£8,420</div>
        <div className="text-[.72rem] text-white/40">Draw closes in 14 days</div>
        <div className="h-[3px] rounded-full bg-white/[0.07] overflow-hidden">
          <div className="h-full w-[55%] rounded-full" style={{ background: "linear-gradient(90deg,#FFB800,#FFD700)" }} />
        </div>
      </motion.div>

      {/* Floating glass card – latest score */}
      <motion.div
        variants={floatB}
        animate="animate"
        className="glass absolute bottom-[28%] right-[7%] w-[170px] px-4 py-3.5 rounded-xl pointer-events-none"
      >
        <div className="text-[.7rem] text-white/40 mb-1.5 tracking-[.05em] uppercase">Latest Score</div>
        <div className="font-display text-[2rem] font-extrabold text-[#00C46A]">
          38 <span className="text-[1rem] text-white/40">pts</span>
        </div>
        <div className="text-[.7rem] text-white/35">Stableford · 18 holes</div>
        <div className="mt-2 flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg,#00C46A,#00E57A)" }}>
            <Check color="black" />
          </div>
          <span className="text-[.68rem] text-white/50">Entered into draw</span>
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <div className="max-w-300 mx-auto px-6 pt-20 pb-24 w-full relative z-[2] ">
        <div className="max-w-[660px] ">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
            className="glass-em inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-7"
          >
            <div className="w-5 h-5 rounded-full bg-[#00C46A] flex items-center justify-center">
              <Zap color="black" />
            </div>
            <span className="text-[.78rem] text-[#00C46A] font-semibold tracking-[.05em]">GOLF · CHARITY · REWARDS</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.15}
            className="font-display hero-title font-extrabold leading-[1.05] mb-6 tracking-[-0.02em]"
            style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}
          >
            Score Big.<br />
            <span className="shimmer-text">Give Back.</span><br />
            Win More.
          </motion.h1>

          {/* Sub */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
            className="text-white/55 leading-[1.7] max-w-[500px] mb-10 font-light"
            style={{ fontSize: "clamp(1rem, 2vw, 1.18rem)" }}
          >
            Track your golf with Stableford scoring, fuel life-changing charities, and enter our monthly prize draw — all in one subscription.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.45}
            className="flex flex-wrap gap-3.5 items-center"
          >
            <Link to={"/dashboard"} className="btn-em px-8 py-3.5 text-base">
              <span className="flex items-center gap-2">
                Start Playing
                <ArrowRight color="black" />
              </span>
            </Link>
          </motion.div>

          {/* Social proof */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={0.6}
            className="flex flex-wrap items-center gap-6 mt-[52px]"
          >
            <div className="flex">
              {["#00C46A", "#10b981", "#34d399", "#6ee7b7"].map((c, i) => (
                <div key={i} className="w-[34px] h-[34px] rounded-full border-2 border-[#080b09] flex items-center justify-center text-[.7rem] font-bold text-[#061209]"
                  style={{ background: `linear-gradient(135deg, ${c}, ${c}99)`, marginLeft: i === 0 ? 0 : -10 }}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex gap-0.5 mb-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} color="black" fill="orange" />)}
              </div>
              <p className="m-0 text-[.8rem] text-white/45">
                Trusted by <strong className="text-[#f0f4f1]">2,400+</strong> golfers across the UK
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none"
        style={{ background: "linear-gradient(0deg, #080b09, transparent)" }} />
    </section>
  );
}

export default Hero