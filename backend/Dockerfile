FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Copy backend code into the container
COPY . .

# Install dependencies
RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic

# Command to run the app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
