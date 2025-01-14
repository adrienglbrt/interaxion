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

export interface OptionalSingleVideoBlockWithLinks {
  blockIndex: number;
  blockType: "single";
  video: string;
  version: "Horizontal" | "Vertical";
  links: VideoLinkObject[];
}

export interface OptionalTripleVideoBlockWithLinks {
  blockIndex: number;
  blockType: "triple";
  videos: {
    videoOne: string;
    videoTwo: string;
    videoThree: string;
  };
  links: {
    videoOne: VideoLinkObject[];
    videoTwo: VideoLinkObject[];
    videoThree: VideoLinkObject[];
  };
}

export type OptionalVideoBlockWithLinks =
  | OptionalSingleVideoBlockWithLinks
  | OptionalSingleVideoBlockWithLinks;

export interface ProjectWithLoopLinks extends Project {
  videoDirectLinks?: VideoLoopLinks;
}
