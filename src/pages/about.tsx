import ContactBlock from "@/components/blocks/contactBlock";
import Grid from "@/components/layout/grid";
import MetaTags from "@/components/layout/metaTags";
import Wrapper from "@/components/layout/wrapper";
import RichText from "@/components/ui/richText";
import { PageProps } from "@/types/interfaces";
import { getGlobalData, getPageData } from "@/utils/dataQueries";
import { useGlobal } from "@/utils/globalContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useTina } from "tinacms/dist/react";
import { PageAbout } from "../../tina/__generated__/types";

export default function About({ pageData }: { pageData: PageProps }) {
  const { data } = useTina({
    query: pageData.query,
    data: pageData.data,
    variables: pageData.variables,
  });
  const page = data.page as PageAbout;
  const globalData = useGlobal();
  const { contact, socials } = globalData.data.global;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Create a translation effect based on scroll
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  return (
    <>
      <MetaTags
        title={page.title}
        metaTitle={page.metaTitle}
        metaDescription={page.metaDescription}
      />
      <Wrapper>
        <main className='pb-32'>
          <Grid>
            <div className='col-span-6 sm:col-start-2 sm:col-span-4 lg:col-start-7 lg:col-span-5 pt-20 lg:pt-40'>
              <RichText text={page.introductionText} />
            </div>
            <div
              className='col-span-6 lg:col-span-12 -mx-4 sm:-mx-8 lg:-mx-16 pt-10 lg:pt-20'
              ref={containerRef}
            >
              <div className='relative pb-[140%] sm:pb-[56.25%] overflow-hidden'>
                <motion.div style={{ y }} className='absolute inset-0'>
                  <Image
                    src={page.image}
                    alt={page.imageAlt ?? ""}
                    fill
                    sizes='100vw'
                    className='object-cover scale-105'
                  />
                </motion.div>
              </div>
            </div>
            <div className='col-span-6 sm:col-start-2 sm:col-span-4 lg:col-start-7 lg:col-span-5 pt-10 lg:pt-20'>
              <h2 className='text-grey'>{page.clients.heading}</h2>
              <p className='pt-4 leading-relaxed max-w-prose text-pretty'>
                {page.clients.content}
              </p>
            </div>
            <div className='col-span-6 sm:col-start-2 sm:col-span-4 lg:col-start-7 lg:col-span-5 pt-10 lg:pt-20'>
              <h2 className='text-grey'>{page.contact.heading}</h2>
              <ContactBlock
                address={contact?.addressOne}
                email={contact?.email}
              />
              {contact.addressTwo && (
                <ContactBlock
                  address={contact?.addressTwo}
                  email={contact?.email}
                />
              )}
            </div>
            <div className='col-span-6 sm:col-start-2 sm:col-span-4 lg:col-start-7 lg:col-span-5 pt-10 lg:pt-20'>
              <h2 className='text-grey'>{page.socials.heading}</h2>
              <ul className='pt-4 leading-relaxed'>
                <li>
                  <Link
                    href={socials?.instagram.url}
                    target='_blank'
                    className='hover:opacity-70 transition-opacity duration-300'
                  >
                    {socials?.instagram.label}
                  </Link>
                </li>
                <li>
                  <Link
                    href={socials?.linkedin.url}
                    target='_blank'
                    className='hover:opacity-70 transition-opacity duration-300'
                  >
                    {socials?.linkedin.label}
                  </Link>
                </li>
              </ul>
            </div>
          </Grid>
        </main>
      </Wrapper>
    </>
  );
}

// Data fetching

export const getStaticProps: GetStaticProps = async () => {
  const [pageData, globalData] = await Promise.all([
    getPageData({ slug: "about" }),
    getGlobalData(),
  ]);

  return { props: { pageData, globalData } };
};
