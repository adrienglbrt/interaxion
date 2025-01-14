import { Project } from "../../tina/__generated__/types";

export interface VideoLinkObject {
  link: string;
  rendition: string;
}

export interface VideoDirectLinks {
  projectId: string;
  linksLoop16by9?: VideoLinkObject[];
  linksLoop9by16?: VideoLinkObject[];
}

export interface ProjectWithDirectLinks extends Project {
  videoDirectLinks?: VideoDirectLinks;
}
