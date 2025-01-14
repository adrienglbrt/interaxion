import { Project } from "../../tina/__generated__/types";

export interface VideoLinkObject {
  link: string;
  rendition: string;
}

export interface VideoLoopLinks {
  projectId: string;
  loop16by9Links?: VideoLinkObject[];
  loop9by16Links?: VideoLinkObject[];
}

export interface ProjectWithLoopLinks extends Project {
  videoDirectLinks?: VideoLoopLinks;
}
