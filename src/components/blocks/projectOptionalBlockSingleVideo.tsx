import { OptionalSingleVideoBlockWithLinks } from "@/types/video";
import { getVideoLinkByRendition } from "@/utils/vimeoQueries";
import { motion } from "framer-motion";
import { ProjectOptionalBlocksSingleVideo } from "../../../tina/__generated__/types";
import VideoBlockPlayerWithControls from "../ui/videoBlockPlayerWithControls";

export default function ProjectOptionalBlockSingleVideo({
  block,
  videoData,
}: {
  block: ProjectOptionalBlocksSingleVideo;
  videoData: OptionalSingleVideoBlockWithLinks;
}) {
  const videoSrc = getVideoLinkByRendition(videoData.links ?? [], "adaptive");

  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <motion.div
        className={`${
          block.version === "Vertical"
            ? "col-span-4 col-start-2 lg:col-start-5 lg:col-span-4" // Narrow version
            : "col-span-6 lg:col-span-12" // Large version
        } w-full`}
        style={{
          aspectRatio: block.aspectRatioWidth / block.aspectRatioHeight,
        }}
        initial={{ clipPath: "inset(1%)", opacity: 0 }}
        whileInView={{
          clipPath: "inset(0%)",
          opacity: 1,
          transition: { duration: 1 },
        }}
        viewport={{ once: true }}
      >
        <VideoBlockPlayerWithControls videoSrc={videoSrc} />
      </motion.div>
    </div>
  );
}
