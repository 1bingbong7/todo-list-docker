# Use an official Node.js runtime as the base image
FROM node:18-alpine3.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the app dependencies inside the container
RUN npm install

# Bundle the app source code inside the container
COPY . .

# Define the network port that this container will listen on at runtime
EXPOSE 5000

# Define the command to run the app
CMD ["npm", "start"]