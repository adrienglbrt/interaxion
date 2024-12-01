import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/router";

const variants = {
  initialState: { opacity: 0 },
  animateState: { opacity: 1 },
  exitState: { opacity: 0 },
};

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const { asPath } = useRouter();
  return (
    <AnimatePresence
      mode='wait'
      initial={true}
      onExitComplete={() => window.scrollTo(0, 0)}
    >
      <motion.div
        initial='initialState'
        animate='animateState'
        exit='exitState'
        variants={variants}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 30,
        }}
        key={asPath}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
