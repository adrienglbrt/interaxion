import ProjectsGrid from "@/components/blocks/projectsGrid";
import MetaTags from "@/components/layout/metaTags";
import Wrapper from "@/components/layout/wrapper";
import { PageProps, ProjectWithDirectLinks } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { getVimeoDirectLinks } from "@/utils/vimeoQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import { Project } from "../../../tina/__generated__/types";

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
  const { page } = data;

  return (
    <>
      <MetaTags
        title={page.title}
        metaTitle={page.metaTitle}
        metaDescription={page.metaDescription}
      />
      <Wrapper>
        <main className='pb-16'>
          <div className='pt-16 lg:pt-24'>
            <h1 className='font-serif tracking-wider text-6xl sm:text-7xl lg:text-8xl xl:text-9xl'>
              {page.title}
            </h1>
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

  const vimeoDirectLinks = await getVimeoDirectLinks(
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
