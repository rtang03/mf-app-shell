import { ApolloProvider } from '@apollo/client';
import { NextPage } from 'next';
import React from 'react';
import { useApollo } from '../utils';

const App: NextPage<any> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
