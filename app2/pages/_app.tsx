import Head from 'next/head';
import React from 'react';

const MyApp: (option: { Component: React.FC; pageProps: any }) => JSX.Element = ({
  Component,
  pageProps,
}) => {
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
};

export default MyApp;
