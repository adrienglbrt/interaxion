import Image from "next/image";
import Link from "next/link";
import { Project } from "../../../tina/__generated__/types";
import Wrapper from "../layout/wrapper";

export default function ShowcaseItem({ project }: { project: Project }) {
  return (
    <li className='relative h-[100svh] w-full snap-start snap-always'>
      <Link href={`/work/${project?._sys.filename}`}>
        {project?.mainImage.image16by9 && (
          <Image
            src={project?.mainImage.image16by9}
            alt=''
            fill
            sizes='100vw'
            className='object-cover'
          />
        )}
      </Link>
      <Wrapper>
        <div className='h-full w-full flex items-center justify-start '>
          <h2 className='font-serif mix-blend-difference text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
            {project?.title}
          </h2>
        </div>
      </Wrapper>
    </li>
  );
}
