import Image from "next/image";
import { Project } from "../../../tina/__generated__/types";
import Wrapper from "../layout/wrapper";
import HeadingOne from "../ui/headingOne";

export default function ProjectHeader({ project }: { project: Project }) {
  return (
    <header className='relative h-[100svh] w-full'>
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
          <div className='sticky top-4 bottom-4 z-10 pt-20 mix-blend-difference'>
            <HeadingOne hasMixBlendMode>{project.title}</HeadingOne>
          </div>
        </Wrapper>
      </div>
    </header>
  );
}
