FROM python:latest
WORKDIR /app
COPY . /app
RUN pip install --no-cache-dir flask pymongo
ENV PORT_NUMBER=80
EXPOSE 80
CMD ["python", "main.py"]
