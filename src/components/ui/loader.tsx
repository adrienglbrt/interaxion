import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div
      className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white opacity-100 z-20'
      key='loader'
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        className='w-10 h-10 border-2 border-black-500 border-t-black rounded-full'
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 1,
        }}
      />
    </motion.div>
  );
}
