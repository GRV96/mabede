ARG NODE_VERSION
FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./package.json /app

RUN npm install

# The container will access the source code through
# a bind mount specified in docker-compose-dev.yml.

ARG EXPOSED_PORT
EXPOSE ${EXPOSED_PORT}

CMD ["npm", "start"]
