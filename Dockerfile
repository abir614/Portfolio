# Stage 1: Install production dependencies
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force

# Stage 2: Optimize and bundle using minimum toolchain
FROM 0abir/minimum:node AS builder
WORKDIR /app/src
COPY . .
COPY --from=deps /app/node_modules ./node_modules
ENV INPUT_DIR=/app/src
ENV OUTPUT_DIR=/app/src
RUN /opt/minimum/scripts/run.sh

# Stage 3: Serve with NGINX Alpine for high-performance production
FROM nginx:alpine

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built production static files
COPY --from=builder /app/src/dist /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 (Fly.io standard)
EXPOSE 8080

# Healthcheck for container liveness
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]