FROM node:12.18.3-alpine

RUN mkdir -p /usr/ui/node_modules && chown -R node:node /usr/ui

WORKDIR /usr/ui

COPY package.json ./

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

ENV PATH="/usr/ui/node_modules/.bin:$PATH"

USER node

RUN yarn

COPY --chown=node:node . .

EXPOSE 3000

# Building app
RUN yarn start

# Running the app
CMD [ "yarn", "start" ]