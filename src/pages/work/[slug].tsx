import Grid from "@/components/layout/grid";
import Wrapper from "@/components/layout/wrapper";
import ProjectHeader from "@/components/ui/projectHeader";
import ProjectIntroduction from "@/components/ui/projectIntroduction";
import { ProjectProps } from "@/types/interfaces";
import { getGlobalData, getProjectData } from "@/utils/dataQueries";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import type { Project } from "../../../tina/__generated__/types";

export default function Project({
  projectData,
}: {
  projectData: ProjectProps;
}) {
  const { data } = useTina({
    query: projectData.query,
    data: projectData.data,
    variables: projectData.variables,
  });

  const project = data.project as Project;

  return (
    <>
      <ProjectHeader project={project} />
      <main>
        <Wrapper>
          <div className='pb-32'>
            <Grid>
              <ProjectIntroduction project={project} />
            </Grid>
          </div>
        </Wrapper>
      </main>
    </>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string };

  const [projectData, globalData] = await Promise.all([
    getProjectData({ slug }),
    getGlobalData(),
  ]);

  return { props: { projectData, globalData } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.queries.projectConnection({});
  const paths =
    data?.projectConnection?.edges?.map((edge) => {
      return {
        params: {
          slug: edge?.node?._sys.filename,
        },
      };
    }) || [];
  return { paths, fallback: false };
};
