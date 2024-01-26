# Use an official Node.js runtime as a parent image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code to /app
COPY ./ /app

# Build the app for production --prod
RUN npm run build 

# Expose port 80 for the container
EXPOSE 80

# Start the app
CMD ["npm", "start"]