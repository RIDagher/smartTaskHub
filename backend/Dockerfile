# Use the official Node.js 18 image as the base
FROM node:18

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Make the database wait scripts executable
RUN chmod +x wait-for-db.sh wait-for-it.sh

# Expose port 5000 for the backend server
EXPOSE 5000

# Start the app using the wait-for-db script (waits for DB before starting server)
CMD ["./wait-for-db.sh"]