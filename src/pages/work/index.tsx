import ProjectsGrid from "@/components/blocks/projectsGrid";
import MetaTags from "@/components/layout/metaTags";
import Wrapper from "@/components/layout/wrapper";
import { PageProps, ProjectWithDirectLinks } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { getVideoLoopDirectLinks } from "@/utils/vimeoQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import { PageWork, Project } from "../../../tina/__generated__/types";

export default function Work({
  pageData,
  activeProjects,
}: {
  pageData: PageProps;
  activeProjects: ProjectWithDirectLinks[];
}) {
  const { data } = useTina({
    query: pageData.query,
    data: pageData.data,
    variables: pageData.variables,
  });
  const { page } = data as { page: PageWork };

  return (
    <>
      <MetaTags
        title={page.title}
        metaTitle={page.metaTitle}
        metaDescription={page.metaDescription}
      />
      <Wrapper>
        <main className='pb-16'>
          <div className='pt-16 lg:pt-32 xl:pt-48'>
            <div className='flex max-lg:flex-col max-lg:items-start lg:grid lg:grid-cols-3 lg:gap-4 lg:items-end'>
              <div className='lg:col-span-2'>
                <h1 className='relative font-serif tracking-wider text-6xl sm:text-7xl lg:text-8xl 2xl:text-9xl lg:-bottom-[8px] 2xl:-bottom-[11px]'>
                  {page.heading}
                </h1>
              </div>
              <div className='pt-8 lg:col-start-3 '>
                <h2 className='text-grey'>{page.timeframe}</h2>
                <p className='pt-2 max-w-prose text-pretty'>
                  {page.introduction}
                </p>
              </div>
            </div>
          </div>
          {activeProjects && activeProjects.length > 0 && (
            <ProjectsGrid projects={activeProjects} />
          )}
        </main>
      </Wrapper>
    </>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const [pageData, projectsList, globalData] = await Promise.all([
    getPageData({ slug: "work" }),
    getProjectsList(),
    getGlobalData(),
  ]);

  const activeProjects = projectsList
    .map(({ node }) => node)
    .filter(
      (project): project is Project =>
        project !== undefined && project?.isActive === true
    )
    .sort((a, b) => {
      return (b?.year ?? 0) - (a?.year ?? 0);
    });

  const vimeoDirectLinks = await getVideoLoopDirectLinks(
    activeProjects as Project[]
  );

  const projectsWithVimeoLinks = activeProjects.map((project) => {
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
    props: { pageData, activeProjects: projectsWithVimeoLinks, globalData },
  };
};
