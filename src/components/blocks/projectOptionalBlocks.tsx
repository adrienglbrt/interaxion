import type {
  Maybe,
  ProjectOptionalBlocks,
} from "../../../tina/__generated__/types";
import ProjectOptionalBlockDualImage from "./projectOptionalBlockDualImage";
import ProjectOptionalBlockSingleImage from "./projectOptionalBlockSingleImage";
import ProjectOptionalBlockTripleImage from "./projectOptionalBlockTripleImage";

export default function ProjectOptionalBlocks({
  blocks,
}: {
  blocks: Maybe<ProjectOptionalBlocks>[];
}) {
  if (!blocks) return null;

  return (
    <>
      {blocks.map((block, index) => {
        if (!block) return null;
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
          default:
            return null;
        }
      })}
    </>
  );
}
