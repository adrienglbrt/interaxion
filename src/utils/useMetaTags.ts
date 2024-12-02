import { useGlobal } from "./globalContext";

export function useMetaTags(
  title: string,
  metaTitle?: string | null,
  metaDescription?: string | null,
  fallbackDescription?: string | null,
  ogImage?: string | null
) {
  const globalData = useGlobal();
  const { websiteTitle, websiteDescription, websiteImage } =
    globalData.data.global.metaData;

  const finalMetaTitle = metaTitle ? metaTitle : title + " - " + websiteTitle;
  const finalMetaDescription = metaDescription
    ? metaDescription
    : fallbackDescription || websiteDescription;
  const finalOgImage = ogImage ? ogImage : websiteImage;

  return {
    finalMetaTitle: finalMetaTitle,
    finalMetaDescription: finalMetaDescription,
    finalOgImage: finalOgImage,
  };
}
