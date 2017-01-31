FROM node:7.4-onbuild

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
# FIXME if e are mapping volumes, the copy is extraneous
COPY . /usr/src/app


EXPOSE 1337
CMD [ "npm", "start" ]