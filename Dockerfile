FROM node:lts-alpine3.12

WORKDIR /app

ENV TWB_QUESTION_SERVER=

# Install git
# bower needs it
RUN apk --no-cache add git

# Install Bower
RUN npm install -g bower

# Install app dependencies
COPY package*.json ./
RUN npm install

COPY .bowerrc ./
COPY bower.json ./
RUN bower install --allow-root

COPY . .

EXPOSE 3000

CMD [ "node", "app.js" ]