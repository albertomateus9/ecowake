from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

app = FastAPI(title="EcoWake API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "ecowake-backend"
    }

@app.get("/api/ships")
async def list_ships():
    """Lista todos os navios monitorados"""
    return {
        "ships": [
            {"id": 1, "name": "Navio 1", "class": "Suezmax"},
            {"id": 2, "name": "Navio 2", "class": "Aframax"},
        ]
    }

@app.post("/api/predict")
async def predict_fouling(ship_id: int = 1):
    """Faz predição de bioincrustação"""
    return {
        "ship_id": ship_id,
        "fouling_level": 2.5,
        "efficiency_index": 92.3,
        "alert_status": "warning",
        "predicted_critical_date": "2025-12-15",
        "co2_savings": 45.2,
        "recommendation": "Schedule cleaning within 7 days"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
