import { ApolloProvider, ApolloClient } from '@apollo/client';
import { StylesProvider } from '@material-ui/core/styles';
import React from 'react';
import Dashboard from './Dashboard';

const DashboardService = ({
  apolloClient,
}: JSX.IntrinsicAttributes & { children: JSX.Element; apolloClient: ApolloClient<any> }) => (
  <ApolloProvider client={apolloClient}>
    <StylesProvider injectFirst>
      <Dashboard />
    </StylesProvider>
  </ApolloProvider>
);

export default DashboardService;
