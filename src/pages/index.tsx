import ShowcaseItem from "@/components/ui/showcaseItem";
import { PageProps } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import {
  Project,
  ProjectConnectionEdges,
} from "../../tina/__generated__/types";

export default function Home({
  pageData,
  projectsList,
}: {
  pageData: PageProps;
  projectsList: ProjectConnectionEdges[];
}) {
  const { data } = useTina({
    query: pageData.query,
    data: pageData.data,
    variables: pageData.variables,
  });
  const { page } = data;

  const activeProjects = projectsList
    .map(({ node }) => node)
    .filter((project) => project?.isActive && project?.isShowcased);

  return (
    <main className='h-[100dvh]'>
      <h1 className='hidden'>{page.title}</h1>
      <ul className='h-[100dvh] overflow-y-scroll snap-y snap-mandatory'>
        {activeProjects &&
          activeProjects.length > 0 &&
          activeProjects.map((project) => {
            return (
              <ShowcaseItem key={project?.title} project={project as Project} />
            );
          })}
      </ul>
    </main>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const [pageData, projectsList, globalData] = await Promise.all([
    getPageData({ slug: "home" }),
    getProjectsList(),
    getGlobalData(),
  ]);

  return { props: { pageData, projectsList, globalData } };
};
