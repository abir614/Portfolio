FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm install -g npm@latest && \
    npm ci --ignore-scripts && npm cache clean --force
COPY . .
RUN npm run build

FROM 0abir/minimum:node AS builder
WORKDIR /app/src
COPY --from=deps /app .
ENV INPUT_DIR=/app/src
ENV OUTPUT_DIR=/app/src
RUN /opt/minimum/scripts/run.sh

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/src/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
            CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/healthz || exit 1
CMD ["nginx", "-g", "daemon off;"]
