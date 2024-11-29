import {
  GlobalQuery,
  GlobalQueryVariables,
  PageQuery,
  PageQueryVariables,
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
