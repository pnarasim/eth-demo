# use exsiting docker image as base
FROM node:alpine

WORKDIR /Users/priyanarasimhan/Dev/blockchain/settlemint-demo/eth-demo


# download and install dependencies
COPY ./ ./
RUN npm install --legacy-peer-deps

# tell the image what to do when it starts as a container
CMD ["npm", "run", "dev"]

