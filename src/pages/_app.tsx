import '../styles/globals.css';
import type { AppType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { trpc } from '@lib/trpc';
import { ErrorBoundary } from '@components';

const MyApp: AppType = ({ Component, pageProps }) => <ErrorBoundary>
  <Head>
    <title>IP crawler</title>
    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

    {/* Primary Meta Tags */}
    <title>IP Crawler</title>
    <meta name="title" content="IP Crawler" />
    <meta name="description" content="List of live IP addresses that updates in real-time." />

    {/* Open Graph / Facebook */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://ips.h0b0.dev" />
    <meta property="og:title" content="IP Crawler" />
    <meta property="og:description" content="List of live IP addresses that updates in real-time." />
    <meta property="og:image" content="https://ips.h0b0.dev/meta.jpg" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://ips.h0b0.dev" />
    <meta property="twitter:title" content="IP Crawler" />
    <meta property="twitter:description" content="List of live IP addresses that updates in real-time." />
    <meta property="twitter:image" content="https://ips.h0b0.dev/meta.jpg" />
  </Head>
  <Component {...pageProps} />
</ErrorBoundary>;

export default trpc.withTRPC(MyApp);
