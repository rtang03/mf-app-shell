import Typography from '@material-ui/core/Typography';
import Layout from 'components/Layout';
import { NextPage } from 'next';
import React from 'react';

const Index: NextPage<null> = () => {
  return (
    <Layout title="Gateway">
      <ol>
        <li>Dashboard</li>
      </ol>
    </Layout>
  );
};

export default Index;
