import { ProjectWithDirectLinks } from "@/types/interfaces";
import { useMobile } from "@/utils/mobileContext";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Wrapper from "../layout/wrapper";
import VideoLoop from "./videoLoop";

const AnimatedText = ({
  text,
  isVisible,
}: {
  text: string;
  isVisible: boolean;
}) => {
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
              // ease: [0.33, 1, 0.68, 1],
              ease: [0.79, 0.14, 0.15, 0.86],
              delay: index * 0.03, // Staggered delay
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default function ShowcaseItem({
  project,
  activeSlide,
  index,
}: {
  project: ProjectWithDirectLinks;
  activeSlide: number;
  index: number;
}) {
  const { isMobile } = useMobile();
  const hasLoopVideo =
    project.videoDirectLinks &&
    project.videoDirectLinks?.linksLoop16by9 &&
    project.videoDirectLinks?.linksLoop9by16;

  const videoSrc = useMemo(() => {
    if (!hasLoopVideo) return null;

    return {
      src16by9: getVideoLinkByRendition(
        project.videoDirectLinks?.linksLoop16by9 ?? [],
        "adaptive"
      ),
      src9by16: getVideoLinkByRendition(
        project.videoDirectLinks?.linksLoop9by16 ?? [],
        "adaptive"
      ),
    };
  }, [hasLoopVideo, project.videoDirectLinks]);

  return (
    <li
      className='relative h-[100svh] w-full snap-start snap-always showcase-item'
      data-index={index}
    >
      {hasLoopVideo && videoSrc ? (
        <VideoLoop videoSrc={videoSrc} isPortrait={isMobile} />
      ) : (
        project?.mainImage.image16by9 && (
          <Image
            src={project?.mainImage.image16by9}
            alt={project?.mainImage.alt ?? project.title}
            fill
            sizes='100vw'
            className='object-cover'
          />
        )
      )}
      <Wrapper>
        <div className='h-full w-full flex items-center justify-start'>
          <div>
            <Link href={`/work/${project?._sys.filename}`} className=''>
              <h2 className='flex flex-col gap-2 font-serif tracking-wider mix-blend-difference text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl hover:opacity-70 transition-opacity duration-500'>
                <AnimatedText
                  text={project.brand}
                  isVisible={activeSlide === index}
                />
                <AnimatedText
                  text={project.title}
                  isVisible={activeSlide === index}
                />
              </h2>
            </Link>
          </div>
        </div>
      </Wrapper>
    </li>
  );
}
