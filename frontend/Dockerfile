# =============================================================================
# Stage 1: Build
# =============================================================================
FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --frozen-lockfile

COPY . .

RUN npm run build

# =============================================================================
# Stage 2: Production (nginx serve static files)
# =============================================================================
FROM nginx:stable-alpine AS production

LABEL description="Frontend React - Node 24"

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Config nginx para SPA (react-router)
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

# Copia o build do stage anterior
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
