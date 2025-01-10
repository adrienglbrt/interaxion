import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { ProjectOptionalBlocksSingleImage } from "../../../tina/__generated__/types";

export default function ProjectOptionalBlockSingleImage({
  block,
}: {
  block: ProjectOptionalBlocksSingleImage;
}) {
  const { image, alt, aspectRatioWidth, aspectRatioHeight, version } = block;

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <div
        className={`${
          version === "Small"
            ? "col-span-4 col-start-2 lg:col-start-4 lg:col-span-6" // Small version
            : version === "Medium"
            ? "col-span-4 col-start-2 lg:col-start-3 lg:col-span-8" // Medium version
            : "col-span-6 lg:col-span-12" // Large version
        } w-full`}
      >
        <motion.div
          ref={containerRef}
          className='w-full'
          initial={{ clipPath: "inset(1%)", opacity: 0 }}
          animate={
            isInView
              ? { clipPath: "inset(0%)", opacity: 1 }
              : { clipPath: "inset(1%)", opacity: 0 }
          }
          transition={{ duration: 1 }}
        >
          <Image
            src={image}
            alt={alt ?? ""}
            width={aspectRatioWidth}
            height={aspectRatioHeight}
            sizes={`${
              version === "Small"
                ? "50vw"
                : version === "Medium"
                ? "75vw"
                : "100vw"
            }`}
            className='w-full'
          />
        </motion.div>
      </div>
    </div>
  );
}
