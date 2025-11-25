# ============================================================================
# Dockerfile for Node.js Express Server Tutorial
# ============================================================================
# This Dockerfile packages the Express.js application for container deployment.
# It uses a lightweight Alpine-based Node.js image for minimal footprint and
# implements Docker best practices for layer caching and security.
#
# Build: docker build -t nodejs-express-tutorial .
# Run:   docker run -p 3000:3000 nodejs-express-tutorial
# ============================================================================

# Use official Node.js 20 Alpine image (lightweight, matches environment v20.19.5)
FROM node:20-alpine

# Add labels for container metadata and documentation
LABEL maintainer="Blitzy Platform"
LABEL description="Node.js Express Server Tutorial - Simple REST API with Hello World and Good Evening endpoints"
LABEL version="1.0.0"
LABEL org.opencontainers.image.title="nodejs-express-tutorial"
LABEL org.opencontainers.image.description="Tutorial Node.js server demonstrating Express.js framework with two endpoints"
LABEL org.opencontainers.image.source="https://github.com/blitzy/nodejs-express-tutorial"
LABEL org.opencontainers.image.licenses="MIT"

# Set environment variables
# NODE_ENV=production optimizes Node.js for production performance
ENV NODE_ENV=production

# Set the working directory inside the container
# All subsequent commands will be relative to this directory
WORKDIR /app

# Copy package files first for optimal layer caching
# This ensures npm install layer is only rebuilt when dependencies change
COPY package*.json ./

# Install production dependencies only
# Using npm ci for deterministic, reproducible builds (uses package-lock.json)
# --only=production excludes devDependencies to minimize image size
RUN npm ci --only=production && \
    npm cache clean --force

# Copy application source code
# This layer is rebuilt when any source file changes
COPY . .

# Create a non-root user for security best practices
# Running as root inside containers is a security risk
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001 -G nodejs && \
    chown -R nodejs:nodejs /app

# Switch to non-root user
USER nodejs

# Document the port the application listens on
# This is informational; actual port mapping is done at runtime
EXPOSE 3000

# Define the health check to verify the container is running correctly
# Checks the root endpoint every 30 seconds with 3 retries
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

# Start the Express.js server
# Using exec form for proper signal handling (SIGTERM, etc.)
CMD ["node", "server.js"]
