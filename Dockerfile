# Stage 1: Build the application
FROM node:18.20.4-alpine AS build-stage

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy package.json
COPY package.json ./

# Install dependencies
RUN pnpm install

# Copy the rest of your application code
COPY . .

# Build the application
RUN pnpm run build

# Stage 2: Serve the application from Nginx
FROM nginx:1.26.2-alpine

ARG CONFIG_PATH

COPY --from=build-stage /app/dist /usr/share/nginx/html/