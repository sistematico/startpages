# Stage 1: Build the React application
FROM node:18.19-alpine as build-frontend
WORKDIR /app/client
COPY app/client/package*.json ./
RUN npm ci --only=production
COPY app/client ./
RUN npm run build

# Stage 2: Set up the Flask application
FROM python:3.10.12-slim

# Create non-root user
RUN useradd -m -u 1000 appuser

WORKDIR /app

# Copy requirements and install dependencies
COPY app/server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy Flask app and React app
COPY app/server ./
COPY app/client/build ./

# Create data directory and set permissions
RUN mkdir -p /app/data && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Set the working directory where data.json will be stored
ENV DATA_FILE=/app/data/data.json

# Expose port
EXPOSE 5000

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Start Flask app
CMD ["python", "app.py"]