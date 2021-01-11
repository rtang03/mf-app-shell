import Container from '@material-ui/core/Container';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ChangeHistoryIcon from '@material-ui/icons/ChangeHistory';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React, { useState } from 'react';
import { useMeQuery } from '../graphql/generated-nextjs-backend';
import FullTextSearch from './FullTextSearch';
import Metrics from './Metrics';

const Dashboard: (option: { debug?: boolean }) => JSX.Element = ({ debug = false }) => {
  // query /control/api/graphql
  const { data, error, loading } = useMeQuery();

  // Toggle Button
  const [selection, setSelection] = useState('metrics');
  const handleSelection = (event: React.MouseEvent<HTMLElement>, item: string) =>
    setSelection(item);

  if (!data?.me && !loading) {
    console.error(error?.message);
    return <div>Error in page</div>;
  }

  debug && console.log('[debug] meQuery return:', data?.me);

  return (
    <Container>
      <ToggleButtonGroup
        aria-label="text alignment"
        exclusive
        value={selection}
        onChange={handleSelection}>
        <ToggleButton value="metrics" aria-label="loaded entity">
          <AssessmentIcon />
          Metrics
        </ToggleButton>
        <ToggleButton value="entity" aria-label="find by entity">
          <FindInPageIcon />
          By Type
        </ToggleButton>
        <ToggleButton value="commit" aria-label="find by commit">
          <ChangeHistoryIcon />
          History
        </ToggleButton>
      </ToggleButtonGroup>
      <br />
      {{
        ['metrics' as string]: <Metrics />,
        ['entity']: <FullTextSearch findBy={selection} />,
        ['commit']: <FullTextSearch findBy={selection} />,
      }[selection] || <Metrics />}
    </Container>
  );
};

export default Dashboard;
