import Typography from '@material-ui/core/Typography';
import { NextPage } from 'next';
import React from 'react';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';

const DashboardPage: NextPage<any> = () => {
  return (
    <Layout title="Gateway">
      <ol>
        <li>[ Dashboard ]</li>
      </ol>
      <Dashboard />
    </Layout>
  );
};

export default DashboardPage;
