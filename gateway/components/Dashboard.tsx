import React from 'react';
import { useMeQuery } from '../graphql/generated/ui-control';

const Dashboard: () => JSX.Element = () => {
  const { data, error, loading } = useMeQuery();
  console.log(data);
  console.log(error);

  return <div>test</div>;
};

export default Dashboard;
