# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port that your NestJS application will listen on
EXPOSE 3000

# Start your NestJS application
CMD ["npm", "run", "start"]
