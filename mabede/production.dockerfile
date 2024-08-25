ARG NODE_VERSION
FROM node:${NODE_VERSION}

WORKDIR /app

COPY ./package.json /app

RUN npm install

COPY ./nodemon.json /app

COPY ./src /app/src

ARG EXPOSED_PORT
EXPOSE ${EXPOSED_PORT}

CMD ["npm", "start"]
