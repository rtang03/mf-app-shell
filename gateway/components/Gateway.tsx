import { ApolloProvider, ApolloClient } from '@apollo/client';
import React from 'react';
import GreetingAppTwo from './GreetingAppTwo';

const Gateway = ({
  apolloClient,
}: JSX.IntrinsicAttributes & { children: JSX.Element; apolloClient: ApolloClient<any> }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <GreetingAppTwo />
    </ApolloProvider>
  );
};

export default Gateway;
