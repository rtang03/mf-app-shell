![Release](https://github.com/rtang03/mf-app-shell/workflows/Release/badge.svg)
![Build](https://github.com/rtang03/mf-app-shell/workflows/Build/badge.svg)
![Github lerna version](https://img.shields.io/github/lerna-json/v/rtang03/mf-app-shell)

## Micro-frontend App-shell for fabric-es

This is a sample web application for "fabric-es" project in micro-frontend architecture. This sample application
has three main parts.

1. `app-shell` is responsible for user authentication, and data integration via apollo-client
1. `gateway` contains Dashboard component to display info from QueryHandler.
1. `dev-net` deploys the 2-org development network of "fabric-es" project.

### Technology

- Nextjs 10.4
- Jest 26.x
- Apollo Client v3.x
- React 17
- Formik 2
- webpack 5.x
- Material-ui 4.x with JSS
- graphql-codegen
- Lerna

### Features

- Server side rendering
- Custom server side as a reverse proxy
- JWT-based access token and refresh token
- GQL codegen
- Native Typescript
- Dockerized app-shell and gateway UI
- ESLint
- Prettier
- Jest testing

### Getting Started

_step 1: start dev-net_

Bootstrap the 2-org fabric network, with 2 gw-org.

```shell
# at dev-net
# It deploys the dev-net for developing web UI
./dn-run.2-db-red-auth-gw.sh

# at root
npm install

# at app-shell
npm install

```

_step 2a: Develop micro-frontend gateway_

The micro-frontend gateway can be developed independently of app-shell. When developing mfe, the app-shell is
not required to start. It will use mocked api, instead of writing / retrieving data from 'dev-net'. This is
suitable for pure web ui development.

```shell
# gateway
npm install

# run micro-frontend gateway development mode
npm run dev
```

_step 2b: Build micro-frontend gateway_

After the building, the webpack creates the `dist` directory, for remote component. If additional component is later
developed, please remind to modify the `webpack.config.js` to reflect the change.

```shell
# gateway/sidecar
npm install
npm run build
```

_step 2c: Run micro-frontend gateway_

After the development of mfe gateway, you may launch the local dev server, so that app-shell can later consume it. When
running it, the hosting `gateway` next project can be _optionally_ turned off.

```shell
# gateway/sidecar
npm start
```

_step 3: Develop and run app-shell_

When developing app-shell (except the remote componet), the mfe gateway is optionally running. Please make sure **BOTH**
.env and .env.local are properly configured.

```shell
# app-shell
npm install
npm run dev
```

### Dockerize

After finishing development, you may test the deployment, after finishing development. Notice that when running `./build-app-shell.sh`, or
`./build-mf-gateway.sh`, `./dn-run.2-db-red-auth-gw-ui.sh`, it will run `./cleanup.sh` at the beginning.
Previously persistence information in the dev-net will be gone.

```shell
# dev-net
# build app shell
./build-app-shell.sh

# build microfrontend gateway
./build-mf-gateway.sh

# run EVERYTHING in one go
./dn-run.2-db-red-auth-gw-ui.sh
```

As a testing purpose, you run below command to see if the images above are able to launch. But you should run
them as an individual container directly; coz it cannot connect to docker network, created by docker-compose.

```shell
docker run -p 3000:3000 fabric-es/mf-shell
docker run -p 8082:8082 fabric-es/mf-gateway
```

### Known Limitation

As the author of Module Federation, "Zack Jackson" points out that current version (v10.4) of NextJs is using webpack v4.x
The Module Federation is webpack v5 feature. To workaround, here adopts the sidecar pattern to build the "remoteService"
from the Next project. Whenever, Next upgrades to webpack v5, the sidecar can be removed.

### Reference info / sample codes

- [webpack module federation](https://webpack.js.org/concepts/module-federation/)
- [mfe introduction](https://medium.com/@ScriptedAlchemy/micro-fe-architecture-webpack-5-module-federation-and-custom-startup-code-9cb3fcd066c)
- [mfe samples](https://github.com/burzaszsolt/react-module-federation/tree/master/mf-cart/src)
- [Using Formik](https://github.com/benawad/formik-2-example)
- [TS + Next + Graphql](https://github.com/benawad/typescript-nextjs-graphql-series)
- [Next + Oauth2](https://dev.to/whoisryosuke/nextjs-and-authentication-using-oauth2-and-jwt-3gc6)
- [Next + Oauth2 + cookie](https://github.com/whoisryosuke/nextjs-oauth2-cookie-auth/blob/master/utils/withAuth.js)
- [Graphql Playground](https://github.com/prisma-labs/graphql-playground/tree/master/packages/graphql-playground-react)
- [customized iql](https://github.com/ericclemmons/customized-graphiql)
- [Starter project](https://github.com/tomanagle/Apollo-Next.js-GraphQL-starter)
- [tutorial](https://jolvera.dev/posts/user-authentication-with-nextjs)
- [code example](https://github.com/zeit/next.js/tree/canary/examples/with-cookie-auth-fauna)
- [jwt + gql](https://hasura.io/blog/best-practices-of-using-jwt-with-graphql/)
