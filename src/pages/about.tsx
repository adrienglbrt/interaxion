import { PageProps } from "@/types/interfaces";
import { getPageData } from "@/utils/dataQueries";
import { GetStaticProps } from "next";
import { useTina } from "tinacms/dist/react";

export default function About({ pageData }: { pageData: PageProps }) {
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
  const [pageData] = await Promise.all([getPageData({ slug: "about" })]);

  return { props: { pageData } };
};
