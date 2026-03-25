# Use official Node.js runtime
FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package definitions first for caching
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy source code
COPY . .

# Create uploads directory for runtime file storage
RUN mkdir -p uploads

EXPOSE 5000

# Default command
CMD ["npm", "start"]
