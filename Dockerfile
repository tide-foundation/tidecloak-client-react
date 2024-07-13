# Build Stage
FROM node:latest as build-stage

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React application
RUN npm run build

COPY new/. /app/build/new/.

# Production Stage
FROM busybox:1.35

# Create a non-root user to own the files and run our server
RUN adduser -D static
USER static
WORKDIR /home/static

# Copy the static website
# Use the .dockerignore file to control what ends up inside the image!
# Copy the build artifacts from the build stage to NGINX web server
COPY --from=build-stage /app/build/ /home/static

#COPY . .

# Run BusyBox httpd
CMD ["busybox", "httpd", "-f", "-v", "-p", "3000"]
