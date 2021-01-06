import { Theme } from '@material-ui/core';
import React from 'react';
import ContextProvider from './ContextProvider';

const Gateway = (props: JSX.IntrinsicAttributes & { children: JSX.Element; theme: Theme }) => {
  return (
    <ContextProvider {...props}>
      <div>TEST</div>
    </ContextProvider>
  );
};

export default Gateway;
