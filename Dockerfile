FROM node:10.15.1-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY . .

CMD ["yarn", "start"]