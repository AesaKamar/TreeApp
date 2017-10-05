FROM node:7.4-onbuild

# Create app directory
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /usr/src/app/ && cp -a /tmp/node_modules /usr/src/app/


# Bundle app source
# FIXME if e are mapping volumes, the copy is extraneous
COPY . /usr/src/app
WORKDIR /usr/src/app

EXPOSE 1337
EXPOSE 5858
EXPOSE 3000
# EXPOSE 9229
# npm start command is further defined in package.json
CMD [ "npm", "start" ]