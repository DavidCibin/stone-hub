FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy all backend code including supervisord config
COPY . .

# Install dependencies
RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic \
    && apt-get update && apt-get install -y nginx supervisor

# Copy supervisord config (adjust path if needed)
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose ports
EXPOSE 80 8000

# Start supervisord
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
