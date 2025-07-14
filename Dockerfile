# Use a minimal base Python image
FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy your code into the container
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variable for Flask port
ENV PORT=8080

# Start the app with gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "app:app"]
