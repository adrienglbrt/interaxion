import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ProjectOptionalBlocksDualImage } from "../../../tina/__generated__/types";

export default function ProjectOptionalBlockDualImage({
  block,
}: {
  block: ProjectOptionalBlocksDualImage;
}) {
  const {
    imageOne,
    altOne,
    imageTwo,
    altTwo,
    aspectRatioWidth,
    aspectRatioHeight,
  } = block;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <div
        className={`${
          block.isStackedOnMobile ? "col-span-6" : "col-span-3"
        } lg:col-span-5 lg:col-start-2 w-full`}
      >
        <motion.div
          ref={containerRef}
          className='w-full'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={imageOne}
            alt={altOne ?? ""}
            width={aspectRatioWidth}
            height={aspectRatioHeight}
            sizes='50vw'
            className='w-full'
          />
        </motion.div>
      </div>
      <div
        className={`${
          block.isStackedOnMobile ? "col-span-6" : "col-span-3"
        } lg:col-span-5 w-full`}
      >
        <motion.div
          ref={containerRef}
          className='w-full'
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={imageTwo}
            alt={altTwo ?? ""}
            width={aspectRatioWidth}
            height={aspectRatioHeight}
            sizes='50vw'
            className='w-full'
          />
        </motion.div>
      </div>
    </div>
  );
}
