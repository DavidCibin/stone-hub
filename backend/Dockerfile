# Use a lightweight Python image
FROM python:3.11-slim

# Set working directory inside the container
WORKDIR /app

# ✅ Copy everything from current (backend/) dir
COPY . .

# Install required Python packages
RUN pip install --no-cache-dir fastapi uvicorn httpx pydantic

# Expose the port FastAPI will run on
EXPOSE 8000

# Run the FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
