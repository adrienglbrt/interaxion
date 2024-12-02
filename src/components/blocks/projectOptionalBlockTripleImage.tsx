import Image from "next/image";
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
  return (
    <div className='pt-10 lg:pt-20 col-span-6 lg:col-span-12 grid grid-cols-6 lg:grid-cols-12 gap-1 sm:gap-2 lg:gap-4'>
      <Image
        src={imageOne}
        alt={altOne ?? ""}
        width={aspectRatioWidth}
        height={aspectRatioHeight}
        sizes='33vw'
        className='col-span-2 lg:col-start-4 w-full'
      />
      <Image
        src={imageTwo}
        alt={altTwo ?? ""}
        width={aspectRatioWidth}
        height={aspectRatioHeight}
        sizes='33vw'
        className='col-span-2 w-full'
      />
      <Image
        src={imageThree}
        alt={altThree ?? ""}
        width={aspectRatioWidth}
        height={aspectRatioHeight}
        sizes='33vw'
        className='col-span-2 w-full'
      />
    </div>
  );
}
