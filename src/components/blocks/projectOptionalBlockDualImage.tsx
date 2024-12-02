import Image from "next/image";
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
  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <Image
        src={imageOne}
        alt={altOne ?? ""}
        width={aspectRatioWidth}
        height={aspectRatioHeight}
        sizes='50vw'
        className='col-span-3 lg:col-span-5 lg:col-start-2 w-full '
      />
      <Image
        src={imageTwo}
        alt={altTwo ?? ""}
        width={aspectRatioWidth}
        height={aspectRatioHeight}
        sizes='50vw'
        className='col-span-3 lg:col-span-5 w-full'
      />
    </div>
  );
}
