FROM node:10

WORKDIR /usr/src/app

# Install Bower
RUN npm install -g bower

# Install app dependencies
COPY package*.json ./
RUN npm install
RUN bower install

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]