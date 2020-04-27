FROM node:lts-slim

ARG SERVICE_PORT

ARG GIT_KEY

ENV NODE_ENV=production
ENV NODE_PATH=./build

WORKDIR /usr/src/u-documentation-api

COPY package.json tsconfig.json yarn.lock ./
COPY src ./src

RUN yarn --production && yarn cache clean --force && yarn build

EXPOSE $SERVICE_PORT

CMD ["node", "build/index.js"]
