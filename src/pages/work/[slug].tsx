import ProjectHeader from "@/components/blocks/projectHeader";
import ProjectIntroduction from "@/components/blocks/projectIntroduction";
import ProjectOptionalBlocks from "@/components/blocks/projectOptionalBlocks";
import Grid from "@/components/layout/grid";
import MetaTags from "@/components/layout/metaTags";
import Wrapper from "@/components/layout/wrapper";
import { ProjectProps, VideoLinkObject } from "@/types/interfaces";
import { getGlobalData, getProjectData } from "@/utils/dataQueries";
import { getMainVideoDirectLinks } from "@/utils/vimeoQueries";
import { GetStaticPaths, GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";
import client from "../../../tina/__generated__/client";
import type { Project } from "../../../tina/__generated__/types";

export default function Project({
  projectData,
  mainVideoDirectLinks,
}: {
  projectData: ProjectProps;
  mainVideoDirectLinks: VideoLinkObject[];
}) {
  const { data } = useTina({
    query: projectData.query,
    data: projectData.data,
    variables: projectData.variables,
  });

  const project = data.project as Project;

  return (
    <>
      <MetaTags
        title={project.title}
        metaTitle={project.metaTitle}
        metaDescription={project.metaDescription}
      />
      <ProjectHeader
        project={project}
        mainVideoDirectLinks={mainVideoDirectLinks}
      />
      <main>
        <Wrapper>
          <div className='pb-32'>
            <Grid>
              <ProjectIntroduction project={project} />
              {project.optionalBlocks && project.optionalBlocks.length > 0 && (
                <ProjectOptionalBlocks blocks={project.optionalBlocks} />
              )}
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

  const mainVideoDirectLinks = await getMainVideoDirectLinks(
    projectData.data.project as Project
  );

  return { props: { projectData, globalData, mainVideoDirectLinks } };
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
