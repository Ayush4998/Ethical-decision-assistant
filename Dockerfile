# Use a Python base image (make sure it’s a compatible version)
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt to the working directory
COPY requirements.txt /app/

# Upgrade pip to avoid compatibility issues
RUN pip install --upgrade pip

# Install the dependencies
RUN pip install -r requirements.txt

# Copy the rest of the application code to the container
COPY . /app/

# Expose the port Flask will run on (default is 5000)
EXPOSE 5000

# Command to run the Flask app
CMD ["python", "app.py"]
