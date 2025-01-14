import { OptionalSingleVideoBlockWithLinks } from "@/types/video";
import { ProjectOptionalBlocksSingleVideo } from "../../../tina/__generated__/types";

export default function ProjectOptionalBlockSingleVideo({
  block,
  videoData,
}: {
  block: ProjectOptionalBlocksSingleVideo;
  videoData: OptionalSingleVideoBlockWithLinks;
}) {
  console.log(block, videoData);
  return <></>;
}
