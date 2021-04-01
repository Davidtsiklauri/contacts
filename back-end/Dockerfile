FROM node:latest

LABEL version="1.0"
WORKDIR /app

COPY package*.json .
RUN npm i && npm build

COPY ./dist .
EXPOSE 3000

CMD ["npm", "run", "start"]
