# Use the official Node.js 20 image (or your preferred version)
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Expose the port your Express app runs on (change 3000 if you use a different port)
EXPOSE 5000

# Command to start your application
CMD ["node", "server.js"]