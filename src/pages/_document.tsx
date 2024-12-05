import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        <meta property='og:type' content='website' />
      </Head>
      <body className='antialiased bg-white'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
