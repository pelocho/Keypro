# Use the base image of Node.js v20.12.0
FROM node:20.12.0

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . /app/

# Expose the port for the Vite app
EXPOSE 5173

# Set the command to run the Vite app
CMD ["npm", "run", "dev"]