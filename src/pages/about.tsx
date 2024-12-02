import Grid from "@/components/layout/grid";
import MetaTags from "@/components/layout/metaTags";
import Wrapper from "@/components/layout/wrapper";
import RichText from "@/components/ui/richText";
import { PageProps } from "@/types/interfaces";
import { getGlobalData, getPageData } from "@/utils/dataQueries";
import { useGlobal } from "@/utils/globalContext";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
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
            <div className='col-span-6 lg:col-span-12 -mx-4 pt-10 lg:pt-20'>
              <div className='relative pb-[140%] sm:pb-[56.25%]'>
                <Image
                  src={page.image}
                  alt={page.imageAlt ?? ""}
                  fill
                  sizes='100vw'
                  className='object-cover'
                />
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
              <div className='pt-4 leading-relaxed'>
                <p>{contact?.address.addressLineOne}</p>
                <p>{contact?.address.addressLineTwo}</p>
                <p>
                  {contact?.address.postCode +
                    ", " +
                    contact?.address.city +
                    " / " +
                    contact?.address.country}
                </p>
                <p>{contact?.address.phone}</p>
                <Link
                  href={`mailto:${contact?.email}`}
                  className='hover:opacity-70 transition-opacity duration-300'
                >
                  {contact?.email}
                </Link>
              </div>
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
