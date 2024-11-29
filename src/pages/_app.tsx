import "@/styles/globals.css";
import { GlobalProvider } from "@/utils/globalContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalProvider value={pageProps.globalData}>
        <Component {...pageProps} />
      </GlobalProvider>
    </>
  );
}
