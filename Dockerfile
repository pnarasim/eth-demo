# use exsiting docker image as base
FROM node:alpine
RUN apk add g++ make python3

WORKDIR /usr/app


# download and install dependencies
COPY ./package.json ./
RUN npm install --legacy-peer-deps
COPY ./ ./

# tell the image what to do when it starts as a container
# i ran truffle compile and copied over the json contracts manually.

CMD ["npm", "run", "dev"]

