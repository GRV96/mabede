ARG NODE_VERSION
FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./package.json /app

RUN npm install --dev

COPY ./nodemon.json /app

# The container will access the source code through
# a bind mount specified in docker-compose-dev.yml.

ARG EXPOSED_PORT
EXPOSE ${EXPOSED_PORT}

CMD ["npm", "run", "start-dev"]
