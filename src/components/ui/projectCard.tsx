import { useMobile } from "@/utils/mobileContext";
import Image from "next/image";
import Link from "next/link";
import { Project } from "../../../tina/__generated__/types";

export default function ProjectCard({
  project,
  aspectRatio,
}: {
  project: Project;
  aspectRatio: string;
}) {
  const { isMobile } = useMobile();
  return (
    <Link href={`/work/${project?._sys.filename}`} scroll={false}>
      <div
        className='group relative overflow-hidden'
        style={{ paddingBottom: aspectRatio }}
      >
        <div className='absolute inset-0 bg-black z-[1] opacity-0 group-hover:opacity-10 transition-opacity duration-300' />
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
          className='object-cover group-hover:scale-[102%] transition-transform duration-500 ease-in-out'
        />
        {!isMobile && (
          <h2 className='absolute bottom-4 left-4 flex flex-col gap-2 font-serif tracking-wider mix-blend-difference text-white text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10'>
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
