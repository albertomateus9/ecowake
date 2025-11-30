FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Importar dados AIS se disponíveis
CMD ["bash", "-c", "python3 import_ais_data.py || true && uvicorn main:app --host 0.0.0.0 --port 8000 --reload"]
