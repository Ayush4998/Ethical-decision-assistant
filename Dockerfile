FROM python:3.12-slim


# Install system dependencies required by some packages
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy the requirements file
COPY requirements.txt /app/

# Install the required Python packages
RUN pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . /app/

# Expose the port for the Flask app
EXPOSE 5000

# Start the application
CMD ["python", "app.py"]
