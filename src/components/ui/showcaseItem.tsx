import { ProjectWithDirectLinks } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../layout/wrapper";

export default function ShowcaseItem({
  project,
}: {
  project: ProjectWithDirectLinks;
}) {
  return (
    <li className='relative h-[100svh] w-full snap-start snap-always'>
      {project?.mainImage.image16by9 && (
        <Image
          src={project?.mainImage.image16by9}
          alt={project?.mainImage.alt ?? project.title}
          fill
          sizes='100vw'
          className='object-cover'
        />
      )}
      <Wrapper>
        <div className='h-full w-full flex items-center justify-start'>
          <Link href={`/work/${project?._sys.filename}`} scroll={false}>
            <h2 className='flex flex-col gap-2 font-serif mix-blend-difference text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl'>
              <span>{project.brand}</span>
              <span>{project.title}</span>
            </h2>
          </Link>
        </div>
      </Wrapper>
    </li>
  );
}
