import { PageProps } from "@/types/interfaces";
import {
  getGlobalData,
  getPageData,
  getProjectsList,
} from "@/utils/dataQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import { ProjectConnectionEdges } from "../../../tina/__generated__/types";

export default function Work({
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
    <div>
      <h1>{page.title}</h1>
      <ul>
        {activeProjects.map((project) => {
          return <li key={project?.title}>{project?.title}</li>;
        })}
      </ul>
    </div>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const [pageData, projectsList, globalData] = await Promise.all([
    getPageData({ slug: "work" }),
    getProjectsList(),
    getGlobalData(),
  ]);

  return { props: { pageData, projectsList, globalData } };
};
