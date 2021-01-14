# ---- Base Node ----
FROM node:14.15.4-alpine AS dependencies
RUN mkdir -p /home/app
WORKDIR /home/app
COPY . .

RUN npm i \
  && cd /home/app/sidecar \
  && npm i --only=production \
  && cp -R node_modules prod_node_modules \
  && npm i \
  && npm run build:prod \
  && mkdir -p output \
  && cp package.json package-lock.json output \
  && mv prod_node_modules output/node_modules \
  && mv dist output/dist

# ---- Release ----
FROM node:14.15.4-alpine AS release
ENV TIME_ZONE=Asia/Hong_Kong \
    ENV_NAME=production \
    NODE_ENV=production \
    NODE_CONFIG_ENV=production
RUN mkdir -p /home/app
WORKDIR /home/app
LABEL org.opencontainers.image.source https://github.com/rtang03/mf-app-shell
COPY --from=dependencies /home/app/sidecar/output/*.json ./
COPY --from=dependencies /home/app/sidecar/output/node_modules ./node_modules
COPY --from=dependencies /home/app/sidecar/output/dist ./dist

EXPOSE 8082

CMD [ "npm", "start" ]
