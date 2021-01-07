import Layout from 'components/Layout';
import RemoteComponent from 'components/RemoteComponent';
import withAuth from 'components/withAuth';
import { useMeQuery } from 'graphql/generated/ui-control';
import { NextPage } from 'next';
import React from 'react';
import { useApollo } from 'utils';

const Dashboard: NextPage<any> = (props) => {
  const { data, error, loading } = useMeQuery();
  const apolloClient = useApollo(props?.initialApolloState);
  const url = process.env.NEXT_PUBLIC_MF_GATEWAY || '';

  if (!data?.me)
    return (
      <Layout title="Dashboard" loading={loading} user={null} restricted={false}>
        {error?.message}
      </Layout>
    );

  return (
    <Layout title="Dashboard" loading={loading} user={data?.me} restricted={true}>
      <div>
        <RemoteComponent url={url} scope="gateway" module="./Gateway" apolloClient={apolloClient} />
      </div>
    </Layout>
  );
};

export default withAuth(Dashboard);
