import Typography from '@material-ui/core/Typography';
import Layout from 'components/Layout';
import { NextPage } from 'next';
import React from 'react';
import RemoteComponent from '../components/RemoteComponent';

const Index: NextPage<undefined> = () => {
  return (
    <Layout title="Home">
      <Typography variant="h6">Control Panel</Typography>
      <p>Steps to test the functionality:</p>

      <ol>
        <li>Click register and create an account, this will also log you in.</li>
        <li>
          Click home and click profile again, notice how your session is being used through a token
          stored.
        </li>
        <li>
          Click logout and try to go to profile again. You&apos;ll get redirected to the `/login`
          route.
        </li>
      </ol>

      <div>
        <RemoteComponent scope="gw1" module="./Gateway" />
      </div>
      <style jsx>{`
        li {
          margin-bottom: 0.5rem;
        }
      `}</style>
    </Layout>
  );
};

export default Index;
