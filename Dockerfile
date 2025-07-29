FROM node:20-alpine

# Install curl for health checks
RUN apk add --no-cache curl

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy the rest of the application code to the working directory
COPY  . .

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001 -G nodejs && \
    chown -R appuser:nodejs /app

USER appuser

# Build the application
EXPOSE 5000

# Set the environment variable for production
CMD [ "npm","start" ] 