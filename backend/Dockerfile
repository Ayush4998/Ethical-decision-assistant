# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install system dependencies required by some packages
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files for installation first (for Docker layer caching)
COPY requirements.txt /app/

# Install the Python dependencies
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy all application files (including the build directory for React)
COPY . /app/

# Expose the port for the application (8080 is Railway's recommended port)
EXPOSE 8080

# Run the Flask app using Gunicorn for production
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
