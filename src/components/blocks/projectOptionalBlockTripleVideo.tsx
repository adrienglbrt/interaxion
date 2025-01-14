import { OptionalTripleVideoBlockWithLinks } from "@/types/video";
import { ProjectOptionalBlocksTripleVideo } from "../../../tina/__generated__/types";

export default function ProjectOptionalBlockTripleVideo({
  block,
  videoData,
}: {
  block: ProjectOptionalBlocksTripleVideo;
  videoData: OptionalTripleVideoBlockWithLinks;
}) {
  console.log(block, videoData);
  return <></>;
}
