FROM node:7.4-onbuild

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install && npm install -g nodemon

# Bundle app source
# FIXME if e are mapping volumes, the copy is extraneous
COPY . /usr/src/app


EXPOSE 1337
EXPOSE 5858
# npm start command is further defined in pachage.json
CMD [ "npm", "start" ]