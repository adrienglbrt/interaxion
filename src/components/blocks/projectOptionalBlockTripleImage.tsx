import { motion } from "framer-motion";
import { useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { ProjectOptionalBlocksTripleImage } from "../../../tina/__generated__/types";

export default function ProjectOptionalBlockTripleImage({
  block,
}: {
  block: ProjectOptionalBlocksTripleImage;
}) {
  const {
    imageOne,
    altOne,
    imageTwo,
    altTwo,
    imageThree,
    altThree,
    aspectRatioWidth,
    aspectRatioHeight,
  } = block;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <div className='col-span-6 lg:col-start-2 lg:col-span-10 flex gap-1 sm:gap-2 lg:gap-4'>
        <motion.div
          ref={containerRef}
          className='flex-1'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={imageOne}
            alt={altOne ?? ""}
            width={aspectRatioWidth}
            height={aspectRatioHeight}
            sizes='33vw'
            className='w-full'
          />
        </motion.div>
        <motion.div
          ref={containerRef}
          className='flex-1'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={imageTwo}
            alt={altTwo ?? ""}
            width={aspectRatioWidth}
            height={aspectRatioHeight}
            sizes='33vw'
            className='w-full'
          />
        </motion.div>
        <motion.div
          ref={containerRef}
          className='flex-1'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={imageThree}
            alt={altThree ?? ""}
            width={aspectRatioWidth}
            height={aspectRatioHeight}
            sizes='33vw'
            className='w-full'
          />
        </motion.div>
      </div>
    </div>
  );
}
