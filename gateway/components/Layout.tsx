import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import { useStyles } from '../utils';

const Layout: React.FC<{ title?: string }> = ({ children, title = 'no title' }) => {
  const classes = useStyles();

  return (
    <div>
      {' '}
      <Head>
        <title>{title}</title>
      </Head>
      <style jsx global>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          color: #333;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
            Arial, Noto Sans, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
            'Noto Color Emoji';
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .container {
          max-width: 65rem;
          margin: 1.5rem auto;
          padding-left: 1rem;
          padding-right: 1rem;
        }
      `}</style>
      <header>
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <div className={classes.root}>Development Mode</div>
              <Button color="inherit">
                <Link href="/">
                  <a>Instructions</a>
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/dashboard">
                  <a>Dashboard</a>
                </Link>
              </Button>
            </Toolbar>
          </AppBar>
        </div>
      </header>
      <br />
      <Typography variant="h6">Features</Typography>
      {children}
    </div>
  );
};

export default Layout;
