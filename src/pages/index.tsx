import { PageProps } from "@/types/interfaces";
import { getGlobalData, getPageData } from "@/utils/dataQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";

export default function Home({ pageData }: { pageData: PageProps }) {
  const { data } = useTina({
    query: pageData.query,
    data: pageData.data,
    variables: pageData.variables,
  });
  const { page } = data;

  return (
    <div>
      <h1>{page.title}</h1>
    </div>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const [pageData, globalData] = await Promise.all([
    getPageData({ slug: "home" }),
    getGlobalData(),
  ]);

  return { props: { pageData, globalData } };
};
