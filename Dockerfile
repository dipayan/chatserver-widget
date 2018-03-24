FROM node:boron

LABEL maintainer "Dipayan Biswas"
ENV REFRESHED_AT 2018-03-21

COPY package.json /home/node/app/

WORKDIR /home/node/app

RUN npm install

EXPOSE 3000

COPY . /home/node/app/

CMD ["node","app.js"]