# Get base image & crate work dir.
FROM node:15.4
WORKDIR /app

# Copy .json file
COPY package*.json ./
RUN npm install

# Copy everything & build
COPY . ./
CMD node index.js