import Layout from "@/components/layout/layout";
import PageTransition from "@/components/layout/pageTransition";
import "@/styles/globals.css";
import { GlobalProvider } from "@/utils/globalContext";
import { MobileProvider } from "@/utils/mobileContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider value={pageProps.globalData}>
        <MobileProvider>
          <Layout>
            <PageTransition>
              <Component {...pageProps} />
            </PageTransition>
          </Layout>
        </MobileProvider>
      </GlobalProvider>
    </>
  );
}
