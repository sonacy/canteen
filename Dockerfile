FROM node

WORKDIR /canteen

COPY ./package.json .
COPY ./packages/server/package.json ./packages/server/

RUN npm i -g yarn
RUN yarn install --production

COPY ./packages/server/dist ./packages/server/dist
COPY ./packages/server/.env.production ./packages/server/.env.production
COPY ./ormconfig.json .

WORKDIR /canteen/packages/server

ENV NODE_ENV production

EXPOSE 4000

CMD ["node", "dist/index.js"]