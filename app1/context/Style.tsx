// TODO: to be implemented
import {
  StylesProvider,
  ThemeProvider,
  createGenerateClassName,
  createMuiTheme,
} from '@material-ui/core/styles';
import React, { createContext, useState } from 'react';

import dispatchEvent, { eventsToDispatch } from '../utils/events';

const generateClassName = createGenerateClassName({
  productionPrefix: 'frenchieStoreHost',
  seed: 'frenchieStoreHost',
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

const StyleContext = createContext({});

const StyleProvider = ({ children }: { children: JSX.Element }) => {
  const [useDarkTheme, setTheme] = useState(true);

  const switchTheme = () => {
    const nextTheme = useDarkTheme ? lightTheme : darkTheme;
    dispatchEvent(eventsToDispatch.HOST_THEME_CHANGED, nextTheme);
    setTheme((v) => !v);
  };

  return (
    <StyleContext.Provider value={{ useDarkTheme, switchTheme }}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={useDarkTheme ? darkTheme : lightTheme}>{children}</ThemeProvider>
      </StylesProvider>
    </StyleContext.Provider>
  );
};

export default StyleProvider;
