import { NextPage } from 'next';
import React from 'react';
import Layout from '../components/Layout';

const Index: NextPage<any> = () => {
  return (
    <Layout title="Gateway">
      <ol>
        <li>Dashboard</li>
      </ol>
    </Layout>
  );
};

export default Index;
