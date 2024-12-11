import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { Project } from "../../../tina/__generated__/types";
import Wrapper from "../layout/wrapper";

export default function ProjectHeader({ project }: { project: Project }) {
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
    </header>
  );
}
