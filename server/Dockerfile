FROM node:16
WORKDIR /app
COPY package*.json ./

RUN apt-get update
RUN apt-get -y install \
  cmake

RUN npm install --silent
COPY . ./
# copy over your /username directory
COPY ../umar ./
RUN npm run readfile "initial commit"