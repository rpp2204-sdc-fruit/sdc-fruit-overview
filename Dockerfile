## Download the official nodeJSv15 image from docker
FROM node:16.18

## *Optional - The working directory.
## nodeJS working directory
WORKDIR /app

## Split copying package.json and rest of codebase for optimization
## Docker creates layers based on the flow of commands
## Docker caches the results of each layer on build
## Docker only updates layers when needed, but reruns all commands below as well

## Copy package.json (. after is relative /app)
COPY package.json .

## Install dependancies
RUN npm install

##Copy the source code and support files
COPY . ./

## The port the container will run on
EXPOSE 3000

## After image build, when we build or container
##Entry point of nodeJS application
CMD ["node", "server/index.js"]
