import {
  GlobalQuery,
  GlobalQueryVariables,
  PageQuery,
  PageQueryVariables,
  Project,
  ProjectQuery,
  ProjectQueryVariables,
} from "../../tina/__generated__/types";

export interface PageProps {
  data: PageQuery;
  query: string;
  variables: PageQueryVariables;
}

export interface GlobalProps {
  data: GlobalQuery;
  query: string;
  variables: GlobalQueryVariables;
}

export interface ProjectProps {
  data: ProjectQuery;
  query: string;
  variables: ProjectQueryVariables;
}

export interface VimeoDirectLinks {
  projectId: string;
  linkLoop16by9: {};
  linkLoop9by16: {};
}

export interface ProjectWithDirectLinks extends Project {
  videoLinks: VimeoDirectLinks;
}
