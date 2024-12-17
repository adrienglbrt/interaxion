import { AnimatePresence, motion } from "framer-motion";
import VideoMainPlayer from "../ui/videoMainPlayer";

export default function VideoModal({
  mainVideoSrc,
  isModalOpen,
  closeModal,
}: {
  mainVideoSrc: string;
  isModalOpen: boolean;
  closeModal: () => void;
}) {
  const videoModalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20,
      },
    },
    exit: {
      opacity: 0,
      scale: 1,
      transition: {
        duration: 0.3,
      },
    },
  };
  return (
    <AnimatePresence>
      {isModalOpen && mainVideoSrc && (
        <motion.div
          className='fixed inset-0 flex items-center justify-center bg-black z-[100]'
          initial='hidden'
          animate='visible'
          exit='exit'
          variants={videoModalVariants}
        >
          <VideoMainPlayer mainVideoSrc={mainVideoSrc} onClose={closeModal} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
