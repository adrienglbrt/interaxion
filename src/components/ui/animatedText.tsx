import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  isVisible,
  globalDelay = 0,
}: {
  text: string;
  isVisible: boolean;
  globalDelay?: number;
}) {
  return (
    <span className='inline-block'>
      {text.split("").map((char, index) => (
        <span
          key={`${text}-${index}`}
          className='inline-block overflow-hidden'
          style={{ verticalAlign: "top" }}
        >
          <motion.span
            className='inline-block pb-1 sm:pb-2 lg:pb-3'
            initial={{ y: "100%" }}
            animate={{ y: isVisible ? 0 : "100%" }}
            transition={{
              duration: 0.8,
              ease: [0.79, 0.14, 0.15, 0.86],
              delay: globalDelay + index * 0.03,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
