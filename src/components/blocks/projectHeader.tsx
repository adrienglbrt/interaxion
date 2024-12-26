import { VideoLinkObject } from "@/types/interfaces";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import { motion, useScroll, useTransform } from "framer-motion";
import { Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Project } from "../../../tina/__generated__/types";
import Wrapper from "../layout/wrapper";
import AnimatedText from "../ui/animatedText";
import VideoModal from "../ui/videoModal";

export default function ProjectHeader({
  project,
  mainVideoDirectLinks,
}: {
  project: Project;
  mainVideoDirectLinks: VideoLinkObject[];
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mainVideoSrc = getVideoLinkByRendition(
    mainVideoDirectLinks ?? [],
    "adaptive"
  );

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <header
      ref={containerRef}
      className='relative h-screen w-full overflow-hidden'
    >
      <motion.div
        initial={{ clipPath: "inset( 0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{
          duration: 1,
          ease: [0.86, 0, 0.08, 1],
        }}
        className='relative h-full w-full'
      >
        <motion.div
          style={{ y }}
          className='absolute inset-0'
          initial={{ scale: 1 }}
          animate={{ scale: 1.1 }}
          transition={{
            duration: 0.9,
          }}
        >
          <Image
            src={project.mainImage.image16by9}
            alt={project.mainImage.alt ?? project.title}
            fill
            priority
            sizes='100vw'
            className='object-cover scale-100'
          />
        </motion.div>

        {mainVideoSrc && (
          <motion.div
            className='absolute inset-0 flex items-center justify-center z-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <button
              onClick={openModal}
              className='group'
              aria-label='Play video'
            >
              <Play
                className='w-12 h-12 lg:w-16 lg:h-16 group-hover:scale-90 transition-all duration-500 ease-in-out'
                strokeWidth={0}
                fill='white'
              />
            </button>
          </motion.div>
        )}

        <div className='relative h-full w-full'>
          <Wrapper>
            <div className='relative top-16 z-10'>
              <h1 className='flex flex-col gap-2 font-serif tracking-wider text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-white'>
                <AnimatedText
                  text={project.brand}
                  isVisible
                  globalDelay={0.4}
                />
                <AnimatedText
                  text={project.title}
                  isVisible
                  globalDelay={0.4}
                />
              </h1>
            </div>
          </Wrapper>
          <div className='absolute inset-0 bg-black opacity-5' />
        </div>
      </motion.div>
      <VideoModal
        mainVideoSrc={mainVideoSrc}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </header>
  );
}
