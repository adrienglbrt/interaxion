import { VideoLinkObject } from "@/types/interfaces";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { Project } from "../../../tina/__generated__/types";
import Wrapper from "../layout/wrapper";
import VideoMainPlayer from "../ui/videoMainPlayer";

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

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Create a translation effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <header
      ref={containerRef}
      className='relative h-screen w-full overflow-hidden'
    >
      <motion.div style={{ y }} className='absolute inset-0'>
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
        <div className='absolute inset-0 flex items-center justify-center z-10'>
          <button
            onClick={openModal}
            className='bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-4 rounded-full transition-all duration-300 ease-in-out'
            aria-label='Play video'
          >
            Play
          </button>
        </div>
      )}

      <div className='relative h-full w-full'>
        <Wrapper>
          <div className='relative top-16 mix-blend-difference z-10'>
            <h1 className='flex flex-col gap-2 font-serif tracking-wider text-6xl sm:text-7xl lg:text-8xl xl:text-9xl text-white'>
              <span>{project.brand}</span>
              <span>{project.title}</span>
            </h1>
          </div>
        </Wrapper>
      </div>

      {isModalOpen && mainVideoSrc && (
        <div className='fixed inset-0 flex items-center justify-center bg-black z-[100]'>
          <VideoMainPlayer mainVideoSrc={mainVideoSrc} onClose={closeModal} />
        </div>
      )}
    </header>
  );
}
