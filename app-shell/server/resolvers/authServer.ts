import cookie from 'cookie';
import { makeExecutableSchema } from 'graphql-tools';
import {
  ApolloContext,
  LoginResponse,
  RefreshTokenResponse,
  RegisterResponse,
  UpdateProfileResponse,
  User,
} from '../../types';
import {
  catchErrors,
  isLoginResponse,
  isRefreshTokenResponse,
  isRegisterResponse,
  isUpdateProfileResponse,
  isUser,
} from '../../utils';

const initConfig = {
  method: 'POST',
  mode: 'cors' as any,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

// TODO: need fix secure
const cookieOption = { httpOnly: true, secure: false, sameSite: true, path: '/control' };

// Note: all call to auth-server is REST
export default {
  Query: {
    ping: async (): Promise<string> => 'pong',
    // me returns the userinfo from an authtenticated request
    currentUser: catchErrors<User>(
      (_: any, ctx) => {
        if (!ctx?.accessToken) return Promise.reject(new Error('No access token'));

        return fetch(`${ctx.authUri}/account/userinfo`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            authorization: `bearer ${ctx.accessToken}`,
          },
          mode: 'cors',
        });
      },
      { fcnName: 'me', typeGuard: isUser }
    ),
  },
  Mutation: {
    refreshToken: catchErrors<RefreshTokenResponse>(
      (_, { authUri, refreshToken }) => {
        // console.debug(`refreshToken is called: ${refreshToken}`);

        if (!refreshToken) return Promise.reject(new Error('No refresh token'));

        // follow Oauth specification
        return fetch(`${authUri}/oauth/refresh_token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
          },
          body: `refresh_token=${refreshToken}&grant_type=refresh_token`,
          mode: 'cors',
        });
      },
      {
        fcnName: 'refreshToken',
        typeGuard: isRefreshTokenResponse,
        onSuccess: ({ refresh_token }, headers, { res, refreshToken: oldrt }) => {
          console.debug(`old refreshToken: ${oldrt} is expired`);

          // accessToken expiry is currently not used. Still, add to res, and returning to client, for future use
          // the alternative implementation may later add a countdown timer, to renew the accessToken automatically
          res.append('jwtexpiryinsec', headers.get('jwtexpiryinsec') || '');

          // refreshToken will expire at Auth-Server and client cookie at the same time
          res.append('reftokenexpiryinsec', headers.get('reftokenexpiryinsec') || '');

          res.cookie('rt', refresh_token, {
            ...cookieOption,
            maxAge: 1000 * parseInt(headers.get('reftokenexpiryinsec') || '', 10),
          });
        },
      }
    ),
    register: catchErrors<RegisterResponse>(
      ({ username, password, email }, { authUri }) =>
        fetch(`${authUri}/account`, {
          ...initConfig,
          body: JSON.stringify({ username, password, email }),
        }),
      { fcnName: 'register', typeGuard: isRegisterResponse }
    ),
    login: catchErrors<LoginResponse>(
      ({ username, password }, { authUri }) =>
        fetch(`${authUri}/account/login`, {
          ...initConfig,
          body: JSON.stringify({ username, password }),
        }),
      {
        fcnName: 'login',
        typeGuard: isLoginResponse,
        onSuccess: (_, headers, { res }) => {
          // set refreshToken
          const refreshToken = cookie.parse(headers.get('set-cookie') || '')?.rt;

          res.cookie('rt', refreshToken, {
            ...cookieOption,
            maxAge: 1000 * parseInt(headers.get('reftokenexpiryinsec') || '', 10),
          });
        },
      }
    ),
    updateProfile: catchErrors<UpdateProfileResponse>(
      ({ id, username, email }, { authUri, accessToken }) =>
        fetch(`${authUri}/account/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            authorization: `bearer ${accessToken}`,
          },
          mode: 'cors',
          body: JSON.stringify({ username, email }),
        }),
      { fcnName: 'updateProfile', typeGuard: isUpdateProfileResponse }
    ),
    logout: (_: unknown, __: unknown, { res }: ApolloContext): boolean => {
      res.cookie('rt', '', { ...cookieOption, maxAge: 0 });
      return true;
    },
    forget: (_: unknown, { email }: { email: string }): boolean => {
      console.log(email);
      return true;
    },
    reset: (
      _: unknown,
      { password, password2 }: { password: string; password2: string }
    ): boolean => {
      console.log(password, password2);
      return true;
    },
  },
};
