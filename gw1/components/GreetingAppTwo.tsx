import React from 'react';
import { useGetEntityInfoQuery } from '../graphql/generated/queryHandler';

const GreetingAppTwo: (option: { greeting?: string }) => JSX.Element = ({
  greeting = 'Hello 👋🏼 from App Two',
}) => {
  const { data, loading, error } = useGetEntityInfoQuery({
    context: { backend: 'queryHandler' },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <p className="description">
      {greeting}
      <style jsx='true'>{`
        .description {
          color: #234e52;
          background-color: #e6fffa;
          text-align: center;
          border: 4px dashed #b2f5ea;
          padding: 15px;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }
      `}</style>
    </p>
  );
};

export default GreetingAppTwo;
