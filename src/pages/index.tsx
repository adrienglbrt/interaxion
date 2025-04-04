import Showcase from "@/components/blocks/showcase";
import MetaTags from "@/components/layout/metaTags";
import { PageProps } from "@/types/interfaces";
import { ProjectWithLoopLinks } from "@/types/video";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { getVideoLoopDirectLinks } from "@/utils/vimeoQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import { Project } from "../../tina/__generated__/types";

export default function Home({
  pageData,
  activeShowcasedProjects,
}: {
  pageData: PageProps;
  activeShowcasedProjects: ProjectWithLoopLinks[];
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
      <main className='h-[100dvh]'>
        <h1 className='hidden'>{page.title}</h1>
        <Showcase activeShowcasedProjects={activeShowcasedProjects} />
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
        loop16by9Links: vimeoLinks?.loop16by9Links,
        loop9by16Links: vimeoLinks?.loop9by16Links,
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
