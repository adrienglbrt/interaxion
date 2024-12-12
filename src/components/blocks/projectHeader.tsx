import { VideoLinkObject } from "@/types/interfaces";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import Image from "next/image";
import { useState } from "react";
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

      <div className='absolute inset-0 flex items-center justify-center'>
        <button
          onClick={openModal}
          className='bg-white bg-opacity-50 hover:bg-opacity-75 text-black p-4 rounded-full transition-all duration-300 ease-in-out'
          aria-label='Play video'
        >
          Play
        </button>
      </div>

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

      {isModalOpen && mainVideoSrc && (
        <div className='fixed inset-0 flex items-center justify-center bg-black z-[100]'>
          <VideoMainPlayer mainVideoSrc={mainVideoSrc} onClose={closeModal} />
        </div>
      )}
    </header>
  );
}
