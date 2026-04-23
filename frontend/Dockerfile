# =============================================================================
# Stage 1: Build
# =============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

ARG VITE_API_URL
ARG VITE_REVERB_HOST
ARG VITE_REVERB_PORT
ARG VITE_REVERB_SCHEME
ARG VITE_REVERB_APP_KEY

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_REVERB_HOST=$VITE_REVERB_HOST
ENV VITE_REVERB_PORT=$VITE_REVERB_PORT
ENV VITE_REVERB_SCHEME=$VITE_REVERB_SCHEME
ENV VITE_REVERB_APP_KEY=$VITE_REVERB_APP_KEY

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

COPY . .
RUN npm run build

# =============================================================================
# Stage 2: Production
# =============================================================================
FROM nginx:stable-alpine AS production

LABEL description="Frontend React"

WORKDIR /usr/share/nginx/html

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm -f /etc/nginx/conf.d/default.conf
RUN mkdir -p /etc/nginx/templates

RUN printf '%s\n' \
'server {' \
'    listen __PORT__;' \
'    server_name _;' \
'    root /usr/share/nginx/html;' \
'    index index.html;' \
'    access_log /dev/stdout;' \
'    error_log /dev/stderr warn;' \
'' \
'    location / {' \
'        try_files $uri $uri/ /index.html;' \
'    }' \
'' \
'    location = /favicon.ico {' \
'        access_log off;' \
'        log_not_found off;' \
'    }' \
'' \
'    location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|map)$ {' \
'        expires 1y;' \
'        add_header Cache-Control "public, immutable";' \
'        access_log off;' \
'    }' \
'' \
'    gzip on;' \
'    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;' \
'    gzip_min_length 1024;' \
'}' > /etc/nginx/templates/default.conf.template

CMD ["sh", "-c", "PORT_TO_USE=${PORT:-80}; sed \"s/__PORT__/${PORT_TO_USE}/g\" /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]