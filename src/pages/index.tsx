import { PageProps } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import { ProjectConnectionEdges } from "../../tina/__generated__/types";

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
    .filter((project) => project?.isActive);

  return (
    <div className='h-[100svh] overflow-hidden'>
      <h1>{page.title}</h1>
      {activeProjects &&
        activeProjects.length > 0 &&
        activeProjects.map((project) => {
          return (
            <li key={project?.title} className='h-full'>
              {project?.title}
            </li>
          );
        })}
    </div>
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
