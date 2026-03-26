import { useInView ,motion} from "framer-motion";
import { useRef } from "react";

const RevealOnScroll = ({ children, delay = 0, className = ""}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (delay = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay },
    }),
  };


  return (
    <motion.div
      ref={ref}
      className={className}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

export default RevealOnScroll