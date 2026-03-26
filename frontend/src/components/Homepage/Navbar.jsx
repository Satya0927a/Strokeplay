import { Show, SignInButton, UserButton } from "@clerk/react";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { Apple, LogIn, Menu } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = ({ scrolled, mobileOpen, setMobileOpen }) => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-[100]"
      animate={{
        background: scrolled ? "rgba(8,11,9,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "blur(0px)",
        borderBottomColor: scrolled ? "rgba(0,196,106,0.1)" : "transparent",
        borderBottomWidth: "1px",
        borderBottomStyle: "solid",
      }}
      transition={{ duration: 1.35, ease: "easeInOut" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex items-center justify-between h-[68px]">

          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 no-underline">
            <div className="w-[34px] h-[34px] rounded-lg flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#00C46A,#00e07a)", boxShadow: "0 0 20px rgba(0,196,106,0.35)" }}>
              <Apple color="black" />
            </div>
            <span className="font-display text-[1.15rem] font-extrabold text-[#f0f4f1] tracking-tight">
              Stroke<span className="text-[#00C46A]">Play</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="desktop-nav flex items-center gap-9">
            {["Home", "Pricing"].map((l, a) => {
              if (l == "Home") {
                return <a key={a} href={`/`} className="nav-link">{l}</a> 
              }
              else{
                return <a key={a} href={`/${l.toLowerCase()}`} className="nav-link">{l}</a>
              }
            })}
          </div>

          <Show when={'signed-out'}>
            <div className="desktop-nav flex items-center gap-3">
              <Link className="btn-outline px-[18px] py-2 text-[.85rem]" to={'/login'}>Log In</Link>
              <Link className="btn-em px-5 py-2 text-[.85rem]" to={'/signup'}>
                <span>SignUp</span>
              </Link>
            </div>
          </Show>
          <Show when={'signed-in'}>
            <UserButton />
          </Show>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="mobile-menu-btn hidden bg-transparent border-none text-[#f0f4f1] cursor-pointer p-1"
          >
            <Menu />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="glass border-t border-white/[0.06] px-6 pt-5 pb-7"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col gap-5 opacity-100 backdrop-blur-3xl">
              {["Home", "Features", "Pricing", "Charities", "About"].map(l => (
                <a key={l} href={`/${l.toLowerCase()}`} className="text-white/70 no-underline text-[.95rem] font-medium">{l}</a>
              ))}
              <div className="flex gap-2.5 mt-1.5">
                <Link className="btn-outline flex-1 py-2.5 text-[.9rem]" to={'/login'}>Log In</Link>
                <Link className="btn-em flex-1 py-2.5 text-[.9rem]" to={'/signup'}><span>Get Started</span></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar