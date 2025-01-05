# Use the official Python image from the Docker hub
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements.txt and install dependencies
COPY requirements.txt /app/
RUN pip install -r requirements.txt

# Copy the entire project to the working directory
COPY . /app/

# Set the command to run the app
CMD ["python", "app.py"]
