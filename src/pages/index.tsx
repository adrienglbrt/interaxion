import MetaTags from "@/components/layout/metaTags";
import ShowcaseItem from "@/components/ui/showcaseItem";
import { PageProps } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import { Project } from "../../tina/__generated__/types";

export default function Home({
  pageData,
  activeShowcasedProjects,
}: {
  pageData: PageProps;
  activeShowcasedProjects: Project[];
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
        <ul className='h-[100dvh] overflow-y-scroll snap-y snap-mandatory'>
          {activeShowcasedProjects &&
            activeShowcasedProjects.length > 0 &&
            activeShowcasedProjects.map((project) => {
              return (
                <ShowcaseItem
                  key={project?.title}
                  project={project as Project}
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

  return { props: { pageData, activeShowcasedProjects, globalData } };
};
