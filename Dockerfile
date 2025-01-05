# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install system dependencies required by some packages
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy the requirements file and install the dependencies
COPY requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire application code into the container
COPY . /app/

# Expose port 8080 (recommended by Railway)
EXPOSE 8080

# Command to run the Flask app using Gunicorn (for production)
CMD ["gunicorn", "-b", "0.0.0.0:8080", "app:app"]
