# Backend Dockerfile

FROM python:3.11-slim

# Install dependencies
WORKDIR /app
COPY ./backend /app
RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic

# Expose port for Railway
EXPOSE 8000

# Start FastAPI with uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
