import MetaTags from "@/components/layout/metaTags";
import ShowcaseItem from "@/components/ui/showcaseItem";
import { PageProps, ProjectWithDirectLinks } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { getVideoLoopDirectLinks } from "@/utils/vimeoQueries";
import { GetStaticProps } from "next";
import { useEffect, useRef, useState } from "react";
import { useTina } from "tinacms/dist/react";
import { Project } from "../../tina/__generated__/types";

function useIntersectionObserver(setActiveSlide: (index: number) => void) {
  const containerRef = useRef<HTMLDivElement>(null);

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

export default function Home({
  pageData,
  activeShowcasedProjects,
}: {
  pageData: PageProps;
  activeShowcasedProjects: ProjectWithDirectLinks[];
}) {
  const { data } = useTina({
    query: pageData.query,
    data: pageData.data,
    variables: pageData.variables,
  });
  const { page } = data;

  const [activeSlide, setActiveSlide] = useState(0);
  const containerRef = useIntersectionObserver(setActiveSlide);

  return (
    <>
      <MetaTags
        title={page.title}
        metaTitle={page.metaTitle}
        metaDescription={page.metaDescription}
      />
      <main className='h-[100dvh]' ref={containerRef}>
        <h1 className='hidden'>{page.title}</h1>
        <ul className='h-[100dvh] overflow-y-scroll snap-y snap-mandatory'>
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
      </main>
    </>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const [pageData, projectsList, globalData] = await Promise.all([
    getPageData({ slug: "home" }),
    getProjectsList(),
    getGlobalData(),
  ]);

  const activeShowcasedProjects = projectsList
    .map(({ node }) => node)
    .filter((project) => project?.isActive && project?.isShowcased)
    .sort((a, b) => (a?.showcaseOrder ?? 10) - (b?.showcaseOrder ?? 10));

  const vimeoDirectLinks = await getVideoLoopDirectLinks(
    activeShowcasedProjects as Project[]
  );

  const projectsWithVimeoLinks = activeShowcasedProjects.map((project) => {
    const vimeoLinks = vimeoDirectLinks.find(
      (link) => link.projectId === project?.id
    );
    return {
      ...project,
      videoDirectLinks: {
        linksLoop16by9: vimeoLinks?.linksLoop16by9,
        linksLoop9by16: vimeoLinks?.linksLoop9by16,
      },
    };
  });

  return {
    props: {
      pageData,
      activeShowcasedProjects: projectsWithVimeoLinks,
      globalData,
    },
  };
};
