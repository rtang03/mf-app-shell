import Layout from 'components/Layout';
import withAuthAsync from 'components/withAuth';
import { useCurrentUserQuery } from 'graphql/generated-next-backend';
import { NextPage } from 'next';
import Router from 'next/router';
import React, { useEffect } from 'react';

const Index: NextPage<any> = () => {
  const { data, error, loading } = useCurrentUserQuery();

  useEffect(() => {
    if (!loading && error) setTimeout(async () => Router.push('/'), 3000);
  });

  return data?.currentUser ? (
    <Layout title="Home" loading={false} user={data?.currentUser} restricted={true}>
      Welcome! {data?.currentUser.username}
    </Layout>
  ) : (
    <Layout title="Home" loading={loading} user={null} restricted={false}>
      {error?.message}
    </Layout>
  );
};

export default withAuthAsync(Index);
