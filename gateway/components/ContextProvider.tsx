import {
  ThemeProvider,
  StylesProvider,
  createGenerateClassName,
  Theme,
} from '@material-ui/core/styles';
import React, { useState } from 'react';

const ContextProvider: (option: { children: JSX.Element; theme: Theme }) => JSX.Element = ({
  children,
  theme,
}) => {
  const [activeTheme, setActiveTheme] = useState(theme);
  const handleThemeChanged = (e: { detail: any }) => setActiveTheme(e.detail);

  const generateClassName = createGenerateClassName({
    productionPrefix: 'mfCart',
    seed: 'mfCart',
  });

  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={activeTheme}>{children}</ThemeProvider>
    </StylesProvider>
  );
};

export default ContextProvider;
