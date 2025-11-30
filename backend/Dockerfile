FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Criar pasta de dados
RUN mkdir -p /app/data/ais

# Executar processamento de dados e iniciar API
CMD ["bash", "-c", "python3 process_ais_data.py 2>&1 || true && uvicorn main:app --host 0.0.0.0 --port 8000"]
