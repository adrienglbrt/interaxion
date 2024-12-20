import { ProjectWithDirectLinks } from "@/types/interfaces";
import { useEffect, useRef, useState } from "react";
import ShowcaseItem from "../ui/showcaseItem";

function useIntersectionObserver(setActiveSlide: (index: number) => void) {
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"));
            setActiveSlide(index);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const slides = container.querySelectorAll(".showcase-item");
    slides.forEach((slide) => observer.observe(slide));

    return () => observer.disconnect();
  }, [setActiveSlide]);

  return containerRef;
}

export default function Showcase({
  activeShowcasedProjects,
}: {
  activeShowcasedProjects: ProjectWithDirectLinks[];
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useIntersectionObserver(setActiveSlide);

  return (
    <ul
      className='h-[100dvh] overflow-y-scroll snap-y snap-mandatory'
      ref={containerRef}
    >
      {activeShowcasedProjects &&
        activeShowcasedProjects.length > 0 &&
        activeShowcasedProjects.map((project, index) => {
          return (
            <ShowcaseItem
              key={project?.title}
              index={index}
              project={project as ProjectWithDirectLinks}
              activeSlide={activeSlide}
            />
          );
        })}
    </ul>
  );
}
