import { OptionalTripleVideoBlockWithLinks } from "@/types/video";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import { motion } from "framer-motion";
import { ProjectOptionalBlocksTripleVideo } from "../../../tina/__generated__/types";
import VideoBlockPlayerWithoutControls from "../ui/videoBlockPlayerWithoutControls";

export default function ProjectOptionalBlockTripleVideo({
  block,
  videoData,
}: {
  block: ProjectOptionalBlocksTripleVideo;
  videoData: OptionalTripleVideoBlockWithLinks;
}) {
  const videoOneSrc = getVideoLinkByRendition(
    videoData.links.videoOne ?? [],
    "adaptive"
  );
  const videoTwoSrc = getVideoLinkByRendition(
    videoData.links.videoTwo ?? [],
    "adaptive"
  );
  const videoThreeSrc = getVideoLinkByRendition(
    videoData.links.videoThree ?? [],
    "adaptive"
  );

  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <motion.div
        className='col-span-6 lg:col-start-2 lg:col-span-10 flex gap-1 sm:gap-2 lg:gap-4'
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
          transition: { duration: 1 },
        }}
        viewport={{ once: true }}
      >
        <div
          className='flex-1'
          style={{
            aspectRatio: block.aspectRatioWidth / block.aspectRatioHeight,
          }}
        >
          <VideoBlockPlayerWithoutControls videoSrc={videoOneSrc} />
        </div>
        <div
          className='flex-1'
          style={{
            aspectRatio: block.aspectRatioWidth / block.aspectRatioHeight,
          }}
        >
          <VideoBlockPlayerWithoutControls videoSrc={videoTwoSrc} />
        </div>
        <div
          className='flex-1'
          style={{
            aspectRatio: block.aspectRatioWidth / block.aspectRatioHeight,
          }}
        >
          <VideoBlockPlayerWithoutControls videoSrc={videoThreeSrc} />
        </div>
      </motion.div>
    </div>
  );
}
