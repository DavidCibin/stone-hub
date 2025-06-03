# Step 1: Build frontend
FROM node:20 AS frontend
WORKDIR /app
COPY frontend/ .
RUN npm install && npm run build

# Step 2: Install backend
FROM python:3.10-slim AS backend
WORKDIR /app
COPY backend/ .
RUN pip install --no-cache-dir -r requirements.txt

# Step 3: Final stage with Nginx + Uvicorn
FROM nginx:alpine
COPY --from=frontend /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy FastAPI backend
COPY --from=backend /app /app

# Install supervisord to run both Nginx and Uvicorn
RUN apk add --no-cache supervisor
COPY supervisord.conf /etc/supervisord.conf

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
