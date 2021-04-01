FROM node:latest

RUN npm install @angular/cli@latest -g


LABEL version="1.0"
WORKDIR /app

COPY package*.json .

RUN npm i 

COPY . .
EXPOSE 4200

CMD ng serve --host 0.0.0.0
