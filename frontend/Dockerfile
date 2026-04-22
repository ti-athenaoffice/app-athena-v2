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

FROM nginx:stable-alpine AS production

LABEL description="Frontend React - Node 24"

RUN rm /etc/nginx/conf.d/default.conf

RUN { \
    echo "server {"; \
    echo "    listen 80;"; \
    echo "    server_name _;"; \
    echo "    root /usr/share/nginx/html;"; \
    echo "    index index.html;"; \
    echo "    access_log /dev/stdout;"; \
    echo "    error_log  /dev/stderr warn;"; \
    echo "    location / {"; \
    echo "        try_files \$uri \$uri/ /index.html;"; \
    echo "    }"; \
    echo "    location ~* \\.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|svg|map)\$ {"; \
    echo "        expires 1y;"; \
    echo "        add_header Cache-Control \"public, immutable\";"; \
    echo "        access_log off;"; \
    echo "    }"; \
    echo "    gzip on;"; \
    echo "    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript;"; \
    echo "    gzip_min_length 1024;"; \
    echo "}"; \
} > /etc/nginx/conf.d/app.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]