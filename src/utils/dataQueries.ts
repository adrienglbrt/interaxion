import client from "../../tina/__generated__/client";
import {
  GlobalQuery,
  GlobalQueryVariables,
  PageQuery,
  PageQueryVariables,
  ProjectConnectionEdges,
  ProjectQuery,
  ProjectQueryVariables,
} from "../../tina/__generated__/types";

export const getPageData = async ({ slug }: { slug: string }) => {
  const result = await client.queries.page({
    relativePath: `${slug}.md`,
  });
  const {
    data,
    query,
    variables,
  }: { data: PageQuery; query: string; variables: PageQueryVariables } = result;
  return { data, query, variables };
};

export const getGlobalData = async () => {
  const result = await client.queries.global({
    relativePath: "global.json",
  });
  const {
    data,
    query,
    variables,
  }: { data: GlobalQuery; query: string; variables: GlobalQueryVariables } =
    result;
  return { data, query, variables };
};

export const getProjectData = async ({ slug }: { slug: string }) => {
  const result = await client.queries.project({
    relativePath: `${slug}.md`,
  });
  const {
    data,
    query,
    variables,
  }: { data: ProjectQuery; query: string; variables: ProjectQueryVariables } =
    result;
  return { data, query, variables };
};

export const getProjectsList = async () => {
  const { data } = await client.queries.projectConnection();
  return data.projectConnection.edges as ProjectConnectionEdges[];
};
