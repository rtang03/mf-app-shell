FROM node:14.15.4-alpine

LABEL org.opencontainers.image.source https://github.com/rtang03/mf-app-shell

ENV TIME_ZONE=Asia/Hong_Kong \
    ENV_NAME=production \
    NODE_ENV=production \
    NODE_CONFIG_ENV=production

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN apk add --no-cache --virtual .build-deps tzdata \
  && mv .env.local.prod .env.local \
  && mv .env.prod .env \
  && cp /usr/share/zoneinfo/Asia/Hong_Kong /etc/localtime \
  && echo "Asia/Hong_Kong" > /etc/timezone \
  && npm install --production \
  && npx next telemetry disable \
  && npm run build \
  && npm uninstall typescript rimraf \
  && apk del .build-deps

CMD [ "npm", "start" ]

EXPOSE 3000
