from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="EcoWake API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok", "service": "EcoWake API"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.get("/api/ships")
def ships():
    return {
        "ships": [
            {"id": 1, "name": "RAFAEL SANTOS", "status": "Operando", "biofouling_level": 2, "fuel_consumption": 45.5, "speed": 14.2},
            {"id": 2, "name": "TRANSPETRO BRASIL", "status": "Manutenção", "biofouling_level": 3, "fuel_consumption": 52.1, "speed": 0},
            {"id": 3, "name": "OCEANO EXPRESS", "status": "Operando", "biofouling_level": 1, "fuel_consumption": 38.2, "speed": 16.5},
            {"id": 4, "name": "SUEZMAX 01", "status": "Operando", "biofouling_level": 2, "fuel_consumption": 48.9, "speed": 15.1}
        ],
        "total": 4
    }
