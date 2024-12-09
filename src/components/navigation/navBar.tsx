import { useGlobal } from "@/utils/globalContext";
import { useMobile } from "@/utils/mobileContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import Grid from "../layout/grid";
import Wrapper from "../layout/wrapper";
import Logo from "../ui/logo";
import NavEntry from "./navEntry";

export default function NavBar() {
  const { isMobile } = useMobile();
  const globalData = useGlobal();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated || !globalData?.data?.global) {
    return null;
  }

  const { contact, socials } = globalData.data.global;

  return (
    <nav className='fixed bottom-0 h-16 w-full mix-blend-difference text-white z-50'>
      <Wrapper>
        <Grid>
          <div className='col-span-2 h-full flex items-center'>
            <Link
              href='/'
              className='uppercase hover:opacity-70 transition-opacity duration-300'
              scroll={false}
            >
              <Logo className='h-[14px] fill-current' />
            </Link>
          </div>
          <div className='relative h-full flex items-center justify-between col-start-4 lg:col-start-7 col-span-3 lg:col-span-6'>
            <NavEntry href='/work'>Work</NavEntry>
            <div className='sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2'>
              <NavEntry href='/about'>About</NavEntry>
            </div>
            {!isMobile && (
              <div className='flex'>
                <NavEntry href={socials.instagram.url} isExternal>
                  Ig
                </NavEntry>
                <span className='mx-2'> / </span>
                <NavEntry href={`mailto:${contact?.email}`} isExternal>
                  Email
                </NavEntry>
              </div>
            )}
          </div>
        </Grid>
      </Wrapper>
    </nav>
  );
}
