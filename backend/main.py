from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os
from datetime import datetime
from sqlalchemy import create_engine, text

app = FastAPI(title="EcoWake API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://ecowake:ecowake_secure_2025@postgres:5432/ecowake_db")
engine = create_engine(DATABASE_URL)

@app.get("/health")
async def health():
    try:
        with engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@app.get("/api/ships")
async def list_ships():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT id, name, class FROM ships ORDER BY id"))
            ships = [{"id": row[0], "name": row[1], "class": row[2]} for row in result]
        return {"ships": ships, "count": len(ships)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.get("/api/predictions")
async def list_predictions():
    try:
        with engine.connect() as conn:
            result = conn.execute(text("SELECT p.id, p.ship_id, s.name, p.fouling_level, p.efficiency_index, p.alert_status FROM predictions p JOIN ships s ON p.ship_id = s.id ORDER BY p.ship_id"))
            predictions = [{"id": r[0], "ship_id": r[1], "ship_name": r[2], "fouling_level": r[3], "efficiency_index": r[4], "alert_status": r[5]} for r in result]
        return {"predictions": predictions, "count": len(predictions)}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

@app.post("/api/upload")
async def upload_data(file: UploadFile = File(...)):
    try:
        content = await file.read()
        df = pd.read_csv(__import__('io').BytesIO(content))
        return {"status": "success", "rows": len(df), "columns": list(df.columns)}
    except Exception as e:
        return JSONResponse(status_code=400, content={"error": str(e)})
