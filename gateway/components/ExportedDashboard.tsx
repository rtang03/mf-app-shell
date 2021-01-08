import { ApolloProvider, ApolloClient } from '@apollo/client';
import React from 'react';
import Dashboard from './Dashboard';

const ExportedDashboard = ({
  apolloClient,
}: JSX.IntrinsicAttributes & { children: JSX.Element; apolloClient: ApolloClient<any> }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Dashboard />
    </ApolloProvider>
  );
};

export default ExportedDashboard;
