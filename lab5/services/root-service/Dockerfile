FROM node:14.15-alpine
EXPOSE 8080
COPY services/root-service/server.js .
COPY services/root-service/package.json ./
COPY services/root-service/yarn.lock ./
RUN yarn install
CMD [ "yarn", "start" ]