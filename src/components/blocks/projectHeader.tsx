import { VideoLinkObject } from "@/types/interfaces";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import Image from "next/image";
import { Project } from "../../../tina/__generated__/types";
import Wrapper from "../layout/wrapper";

export default function ProjectHeader({
  project,
  mainVideoDirectLinks,
}: {
  project: Project;
  mainVideoDirectLinks: VideoLinkObject[];
}) {
  const mainVideoSrc = getVideoLinkByRendition(
    mainVideoDirectLinks ?? [],
    "adaptive"
  );
  console.log(mainVideoSrc);
  return (
    <header className='relative h-screen w-full'>
      <Image
        src={project.mainImage.image16by9}
        alt={project.mainImage.alt ?? project.title}
        fill
        priority
        sizes='100vw'
        className='object-cover'
      />
      <div className='h-full w-full'>
        <Wrapper>
          <div className='sticky top-16 pb-16 mix-blend-difference'>
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
