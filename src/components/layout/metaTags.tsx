import { useMetaTags } from "@/utils/useMetaTags";
import Head from "next/head";

export default function MetaTags({
  title,
  metaTitle,
  metaDescription,
  fallbackDescription,
  ogImage,
}: {
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  fallbackDescription?: string | null;
  ogImage?: string | null;
}) {
  const { finalMetaTitle, finalMetaDescription, finalOgImage } = useMetaTags(
    title,
    metaTitle,
    metaDescription,
    fallbackDescription,
    ogImage
  );
  return (
    <Head>
      <title>{finalMetaTitle}</title>
      <meta name='description' content={finalMetaDescription} />
      <meta property='og:title' content={finalMetaTitle} />
      <meta property='og:description' content={finalMetaDescription} />
      <meta property='og:image' content={finalOgImage} />
    </Head>
  );
}
