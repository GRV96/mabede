FROM node:22.5

WORKDIR /app

COPY ./package.json /app

RUN npm install

# The container will access the source code through
# a bind mount specified in docker-compose-dev.yml.

EXPOSE 3000

CMD ["npm", "start"]
