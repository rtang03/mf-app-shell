import Typography from '@material-ui/core/Typography';
import { NextPage } from 'next';
import React from 'react';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import Container from '@material-ui/core/Container';

const DashboardPage: NextPage<any> = () => {
  return (
    <Layout title="Gateway">
      <ol>
        <li>[ Dashboard ]</li>
      </ol>
      <hr />
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
