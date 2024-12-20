import MetaTags from "@/components/layout/metaTags";
import Wrapper from "@/components/layout/wrapper";
import AnimatedUnderlineLink from "@/components/ui/animatedUnderlineLink";
import { getGlobalData } from "@/utils/dataQueries";
import { useGlobal } from "@/utils/globalContext";
import { GetStaticProps } from "next";

export default function Custom404() {
  const globalData = useGlobal();
  const { error404 } = globalData.data.global;
  return (
    <>
      <MetaTags title={error404.heading} />
      <Wrapper>
        <main className='h-screen w-full flex items-center'>
          <div className='flex flex-col gap-12'>
            <h1 className='font-serif tracking-wider text-6xl lg:text-7xl 2xl:text-8xl'>
              {error404.heading}
            </h1>
            <p>{error404.message}</p>
            <div>
              <AnimatedUnderlineLink href='/'>
                {error404.redirectLinkLabel}
              </AnimatedUnderlineLink>
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const globalData = await getGlobalData();

  return {
    props: {
      globalData,
    },
  };
};
