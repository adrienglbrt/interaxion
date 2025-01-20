import {
  OptionalSingleVideoBlockWithLinks,
  OptionalTripleVideoBlockWithLinks,
  OptionalVideoBlockWithLinks,
} from "@/types/video";
import type {
  Maybe,
  ProjectOptionalBlocks,
} from "../../../tina/__generated__/types";
import ProjectOptionalBlockDualImage from "./projectOptionalBlockDualImage";
import ProjectOptionalBlockSingleImage from "./projectOptionalBlockSingleImage";
import ProjectOptionalBlockSingleVideo from "./projectOptionalBlockSingleVideo";
import ProjectOptionalBlockTripleImage from "./projectOptionalBlockTripleImage";
import ProjectOptionalBlockTripleVideo from "./projectOptionalBlockTripleVideo";

export default function ProjectOptionalBlocks({
  blocks,
  optionalVideoDirectLinks,
}: {
  blocks: Maybe<ProjectOptionalBlocks>[];
  optionalVideoDirectLinks: OptionalVideoBlockWithLinks[];
}) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block, index) => {
        if (!block) return null;

        const videoData = optionalVideoDirectLinks.find(
          (e) => e.blockIndex === index
        );

        switch (block.__typename) {
          case "ProjectOptionalBlocksSingleImage":
            return (
              <ProjectOptionalBlockSingleImage
                key={`block-${index}`}
                block={block}
              />
            );
          case "ProjectOptionalBlocksDualImage":
            return (
              <ProjectOptionalBlockDualImage
                key={`block-${index}`}
                block={block}
              />
            );
          case "ProjectOptionalBlocksTripleImage":
            return (
              <ProjectOptionalBlockTripleImage
                key={`block-${index}`}
                block={block}
              />
            );
          case "ProjectOptionalBlocksSingleVideo":
            if (!videoData) return null;
            return (
              <ProjectOptionalBlockSingleVideo
                key={`block-${index}`}
                block={block}
                videoData={videoData as OptionalSingleVideoBlockWithLinks}
              />
            );
          case "ProjectOptionalBlocksTripleVideo":
            if (!videoData) return null;
            return (
              <ProjectOptionalBlockTripleVideo
                key={`block-${index}`}
                block={block}
                videoData={videoData as OptionalTripleVideoBlockWithLinks}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
