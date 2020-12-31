import Head from 'next/head';
import React from 'react';

export default function MyApp({ Component, pageProps }: { Component: React.FC; pageProps: any }) {
  return (
    <>
      <Head>
        {/* Load our own module and the other app module */}
        <script src="http://localhost:8081/remoteEntry.js" />
        <script src="http://localhost:8082/remoteEntry.js" />
        <title>No title</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
