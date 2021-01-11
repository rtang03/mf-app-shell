import { withStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Layout from 'components/Layout';
import RemoteComponent from 'components/RemoteComponent';
import withAuth from 'components/withAuth';
import { useMeQuery } from 'graphql/generated/ui-control';
import { NextPage } from 'next';
import React from 'react';
import { useApolloWithAuth } from 'utils';

/*
📌 IMPORTANT NOTE:
I found the app shell is not rendering properly. The invocation of remote component append <style />
at the END of <head />. Because both app-shell and remote component use the same MUI core component.
The appending <style /> breaks the app-shell's MUI component (e.g. Button, or Paper). The 2-steps solution:
1. Inside the remote component, use <StyleProvide injectFirst />, to place its <style /> at the top of <head />
2. In the hosting component (here), for those mis-rendered MUI core component, render a invisible component
i.e. <AppendToggleButtonStyleTag />. It appends the correct MUI style tag again.

The same technique applies to other hosting components.

see: https://material-ui.com/styles/advanced/#css-injection-order
Order of <style />
1. The "style tag" of remote component is injectFirst at <head/>. Least priority
2. The app-shell use Mui core components.
3. The ToggleButton via dummy <AppendToggleButtonStyleTag/>
 */
const AppendToggleButtonStyleTag = withStyles({ root: { visibility: 'hidden' } })(ToggleButton);

const Dashboard: NextPage<any> = (props) => {
  const { data, error, loading } = useMeQuery();
  const apolloClient = useApolloWithAuth(props?.initialApolloState);
  const url = process.env.NEXT_PUBLIC_MF_GATEWAY || '';

  return !data?.me ? (
    <Layout title="Dashboard" loading={loading} user={null} restricted={false}>
      {error?.message}
    </Layout>
  ) : (
    <Layout title="Dashboard" loading={loading} user={data?.me} restricted={true}>
      <AppendToggleButtonStyleTag value="nil">nil</AppendToggleButtonStyleTag>
      <div>
        <RemoteComponent
          url={url}
          scope="gateway"
          module="./DashboardService"
          apolloClient={apolloClient}
        />
      </div>
    </Layout>
  );
};

export default withAuth(Dashboard);
