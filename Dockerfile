## Multistage docker build for production

FROM node:17-alpine3.14

RUN mkdir /opt/node-server/

RUN chown -R node:node /opt/node-server/

WORKDIR /opt/node-server

COPY --chown=node:node package*.json ./

COPY --chown=node:node tsconfig.json ./

COPY --chown=node:node .env* ./

RUN chown -R node:node package*.json

COPY --chown=node:node ./src/ ./

USER node

RUN npm install typescript

RUN npm run build

## Stage two

FROM node:17-alpine3.14

WORKDIR /opt/node-server

RUN chown -R node:node /opt/node-server/

COPY --chown=node:node package*.json ./

COPY --from=0 --chown=node:node /opt/node-server/build .

RUN npm install --production

ENV NODE_ENV=production

USER node

EXPOSE 9999

CMD ["node", "server.js"]