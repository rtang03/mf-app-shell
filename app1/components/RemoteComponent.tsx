import { ApolloClient } from '@apollo/client';
import { NewGlobal } from 'global';
import React, { lazy, Suspense, useState } from 'react';
import { dependencies } from '../package.json';

declare const global: NewGlobal;

const useDynamicScript = (url: string) => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  React.useEffect(() => {
    if (!url) return;

    const element = document.createElement('script');
    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${url}`);
      document.head.removeChild(element);
    };
  }, [url]);

  return {
    ready,
    failed,
  };
};

const RemoteComponent = ({
  url,
  scope,
  module,
  fallback = <div>Loading...</div>,
  ...props
}: {
  url: string;
  scope: keyof NewGlobal;
  module: string;
  fallback?: React.ReactFragment;
  apolloClient?: ApolloClient<any>;
}) => {
  const { ready, failed } = useDynamicScript(url);

  if (!scope || !module)
    throw new Error('You must specify scope and module to import a Remote Component');

  if (!ready || failed || !global) return null;

  global[scope].init({
    react: {
      [dependencies.react]: {
        get: () => Promise.resolve().then(() => () => require('react')),
      },
    },
  });

  const Component = lazy(() => global[scope].get(module).then((factory: () => void) => factory()));

  return (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
};

export default RemoteComponent;
