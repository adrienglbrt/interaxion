import ProjectsGrid from "@/components/blocks/projectsGrid";
import Wrapper from "@/components/layout/wrapper";
import HeadingOne from "@/components/ui/headingOne";
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
} from "../../../tina/__generated__/types";

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
    .filter(
      (project): project is Project =>
        project !== undefined && project?.isActive === true
    )
    .sort((a, b) => {
      return (b?.year ?? 0) - (a?.year ?? 0);
    });

  return (
    <Wrapper>
      <div className='pb-16'>
        <div className='pt-16 lg:pt-24'>
          <HeadingOne>{page.title}</HeadingOne>
        </div>
        {activeProjects && activeProjects.length > 0 && (
          <ProjectsGrid projects={activeProjects} />
        )}
      </div>
    </Wrapper>
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
