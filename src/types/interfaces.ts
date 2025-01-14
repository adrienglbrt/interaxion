import {
  GlobalQuery,
  GlobalQueryVariables,
  PageQuery,
  PageQueryVariables,
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

// export interface VideoLinkObject {
//   link: string;
//   rendition: string;
// }

// export interface VideoDirectLinks {
//   projectId: string;
//   linksLoop16by9?: VideoLinkObject[];
//   linksLoop9by16?: VideoLinkObject[];
// }

// export interface ProjectWithDirectLinks extends Project {
//   videoDirectLinks?: VideoDirectLinks;
// }
