from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
import os

app = FastAPI(
    title="EcoWake API",
    version="1.0.0",
    description="API de monitoramento de bioincrustação"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "postgres"),
    "port": int(os.getenv("DB_PORT", 5432)),
    "database": os.getenv("DB_NAME", "ecowake_db"),
    "user": os.getenv("DB_USER", "ecowake"),
    "password": os.getenv("DB_PASSWORD", "ecowake_secure_2025")
}

@contextmanager
def get_db_connection():
    conn = psycopg2.connect(**DB_CONFIG)
    try:
        yield conn
    finally:
        conn.close()

@app.get("/")
async def root():
    return {
        "service": "EcoWake API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor()
            cur.execute("SELECT 1")
            cur.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Database error: {str(e)}")

@app.get("/api/ships")
async def get_ships():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor(cursor_factory=RealDictCursor)
            cur.execute("""
                SELECT 
                    id, name, status, biofouling_level, 
                    fuel_consumption, speed, created_at
                FROM ships
                ORDER BY id
            """)
            ships = cur.fetchall()
            cur.close()
        
        return {
            "ships": [dict(s) for s in ships],
            "total": len(ships),
            "success": True
        }
    except Exception as e:
        return {
            "ships": [],
            "total": 0,
            "success": False,
            "error": str(e)
        }

@app.get("/api/ships/{ship_id}")
async def get_ship(ship_id: int):
    try:
        with get_db_connection() as conn:
            cur = conn.cursor(cursor_factory=RealDictCursor)
            cur.execute("SELECT * FROM ships WHERE id = %s", (ship_id,))
            ship = cur.fetchone()
            cur.close()
        
        if not ship:
            raise HTTPException(status_code=404, detail="Ship not found")
        
        return dict(ship)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/recommendations")
async def get_recommendations():
    try:
        with get_db_connection() as conn:
            cur = conn.cursor(cursor_factory=RealDictCursor)
            cur.execute("""
                SELECT id, ship_id, recommendation, priority, created_at
                FROM recommendations
                ORDER BY priority DESC, created_at DESC
            """)
            recs = cur.fetchall()
            cur.close()
        
        return {
            "recommendations": [dict(r) for r in recs],
            "total": len(recs)
        }
    except Exception as e:
        return {"error": str(e), "recommendations": []}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
