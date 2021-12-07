FROM node:14.15-alpine
EXPOSE 8080
COPY services/service2/server.js .
COPY services/service2/package.json ./
COPY services/service2/yarn.lock ./
RUN yarn install
CMD [ "yarn", "start" ]