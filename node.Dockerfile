# Use the official Node.js 14 image as a parent image
FROM node:20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) into the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem
COPY . .

# Make the container’s port 3000 available to the outside world
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
CMD [ "node", "login.js" ]
