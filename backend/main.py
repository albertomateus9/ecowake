from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
import os

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
    return {"message": "EcoWake API v1.0.0"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/api/ships")
def ships():
    try:
        conn = psycopg2.connect(
            host="postgres",
            port=5432,
            database="ecowake_db",
            user="ecowake",
            password="ecowake_secure_2025"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, name, status, biofouling_level, fuel_consumption, speed FROM ships")
        result = cur.fetchall()
        cur.close()
        conn.close()
        return {"ships": [dict(r) for r in result], "total": len(result)}
    except Exception as e:
        return {"error": str(e), "ships": []}
