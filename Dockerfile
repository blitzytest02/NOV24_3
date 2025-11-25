FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./

# Install production dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
