import { ProjectWithDirectLinks } from "@/types/interfaces";
import { useMobile } from "@/utils/mobileContext";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import VideoLoop from "./videoLoop";

export default function ProjectCard({
  project,
  aspectRatio,
}: {
  project: ProjectWithDirectLinks;
  aspectRatio: string;
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
    <Link href={`/work/${project?._sys.filename}`} scroll={false}>
      <div
        className='group relative overflow-hidden'
        style={{ paddingBottom: aspectRatio }}
      >
        <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-40' />
        <Image
          src={
            aspectRatio === "56.25%"
              ? project.mainImage.image16by9
              : aspectRatio === "75%"
              ? project.mainImage.image4by3 ?? project.mainImage.image16by9
              : project.mainImage.image5by7 ?? project.mainImage.image16by9
          }
          alt={project.title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className={`z-30 object-cover group-hover:scale-[102%] transition-all duration-500 ease-in-out ${
            hasLoopVideo && "group-hover:opacity-0"
          }`}
        />
        {hasLoopVideo && videoSrc && !isMobile ? (
          <VideoLoop
            videoSrc={videoSrc}
            isPortrait={aspectRatio === "140%"}
            fallbackImage={
              aspectRatio === "56.25%"
                ? project.mainImage.image16by9
                : aspectRatio === "75%"
                ? project.mainImage.image4by3 ?? project.mainImage.image16by9
                : project.mainImage.image5by7 ?? project.mainImage.image16by9
            }
          />
        ) : null}
        {!isMobile && (
          <h2 className='absolute bottom-4 left-4 flex flex-col gap-2 font-serif tracking-wider text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-50'>
            <span>{project.brand}</span>
            <span>{project.title}</span>
          </h2>
        )}
      </div>
      {isMobile && (
        <h2 className='pt-2 pb-8 flex justify-between'>
          <span className='truncate text-nowrap'>{project.title}</span>
          <span className='text-grey'>{project.brand}</span>
        </h2>
      )}
    </Link>
  );
}
