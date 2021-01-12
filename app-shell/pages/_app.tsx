import { ApolloProvider } from '@apollo/client';
import { AuthProvider, AlertProvider } from 'components';
import { NextPage } from 'next';
import React from 'react';
import { useApolloWithAuth } from 'utils/useApolloWithAuth';

const App: NextPage<any> = ({ Component, pageProps }) => {
  const apolloClient = useApolloWithAuth(pageProps.initialApolloState);

  return (
    <AlertProvider>
      <AuthProvider>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default App;
