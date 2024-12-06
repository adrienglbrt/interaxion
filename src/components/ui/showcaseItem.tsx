import { ProjectWithDirectLinks } from "@/types/interfaces";
import { useMobile } from "@/utils/mobileContext";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import Image from "next/image";
import { useMemo } from "react";
import Wrapper from "../layout/wrapper";
import AnimatedUnderlineLink from "./animatedUnderlineLink";
import VideoLoop from "./videoLoop";

export default function ShowcaseItem({
  project,
}: {
  project: ProjectWithDirectLinks;
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
    <li className='relative h-[100svh] w-full snap-start snap-always'>
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
            <h2 className='flex flex-col gap-2 font-serif tracking-wider mix-blend-difference text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
              <span>{project.brand}</span>
              <span>{project.title}</span>
            </h2>
            <div className='pt-10'>
              <AnimatedUnderlineLink
                href={`/work/${project?._sys.filename}`}
                className='mix-blend-difference text-white'
              >
                View project
              </AnimatedUnderlineLink>
            </div>
          </div>
        </div>
      </Wrapper>
    </li>
  );
}
