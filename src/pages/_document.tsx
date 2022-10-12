import { Html, Head, Main, NextScript } from 'next/document';

const Document = () => <Html>
  <Head>
    <link rel="icon" href="/favicon.ico" />

    {/* Primary Meta Tags */}
    <meta name="title" content="IP Crawler" />
    <meta name="description" content="List of live IP addresses that updates in real-time." />
    <meta name="keywords" content="cralwer,ip" />
    <meta name="robots" content="index, follow" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="language" content="English" />
    <meta name="author" content="Yanislav Igonin" />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ips.h0b0.dev" />
    <meta property="og:title" content="IP Crawler" />
    <meta property="og:description" content="List of live IP addresses that updates in real-time." />
    <meta property="og:image" content="https://ips.h0b0.dev/meta.jpeg" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://ips.h0b0.dev" />
    <meta property="twitter:title" content="IP Crawler" />
    <meta property="twitter:description" content="List of live IP addresses that updates in real-time." />
    <meta property="twitter:image" content="https://ips.h0b0.dev/meta.jpeg" />
  </Head>

  <body>
    <Main />
    <NextScript />
  </body>
</Html>;

export default Document;
