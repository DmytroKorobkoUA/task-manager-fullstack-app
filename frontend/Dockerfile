# Use the official Node.js image as a base image
FROM node:18 as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Use the official Nginx image for serving static files
FROM nginx:stable

# Copy built files from the previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for serving the app
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
