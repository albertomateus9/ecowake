from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
from psycopg2.extras import RealDictCursor
import os
import sys

# Logs para debug
print("=" * 60, file=sys.stderr)
print("🚀 INICIANDO ECOWAKE API", file=sys.stderr)
print("=" * 60, file=sys.stderr)

app = FastAPI(
    title="EcoWake API",
    version="1.0.0",
    description="API para monitoramento de bioincrustação"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("✅ Middleware CORS configurado", file=sys.stderr)

@app.get("/")
async def root():
    return {"service": "EcoWake API", "version": "1.0.0", "status": "running"}

@app.get("/health")
async def health_check():
    try:
        conn = psycopg2.connect(
            host="postgres",
            port=5432,
            database="ecowake_db",
            user="ecowake",
            password="ecowake_secure_2025",
            connect_timeout=5
        )
        conn.close()
        return {"status": "healthy", "database": "connected"}
    except Exception as e:
        return {"status": "unhealthy", "error": str(e)}

@app.get("/api/ships")
async def get_ships():
    try:
        conn = psycopg2.connect(
            host="postgres",
            port=5432,
            database="ecowake_db",
            user="ecowake",
            password="ecowake_secure_2025"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT id, name, status, biofouling_level, fuel_consumption, speed, created_at FROM ships ORDER BY id")
        ships = cur.fetchall()
        cur.close()
        conn.close()
        
        result = {
            "ships": [dict(s) for s in ships],
            "total": len(ships),
            "success": True
        }
        return result
    except Exception as e:
        print(f"❌ ERRO em /api/ships: {e}", file=sys.stderr)
        return {
            "ships": [],
            "total": 0,
            "success": False,
            "error": str(e)
        }

@app.get("/api/ships/{ship_id}")
async def get_ship(ship_id: int):
    try:
        conn = psycopg2.connect(
            host="postgres",
            port=5432,
            database="ecowake_db",
            user="ecowake",
            password="ecowake_secure_2025"
        )
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM ships WHERE id = %s", (ship_id,))
        ship = cur.fetchone()
        cur.close()
        conn.close()
        
        return dict(ship) if ship else {"error": "Ship not found"}
    except Exception as e:
        return {"error": str(e)}

print("✅ Rotas definidas", file=sys.stderr)
print("=" * 60, file=sys.stderr)
print("API pronta para receber requisições", file=sys.stderr)
print("=" * 60, file=sys.stderr)

if __name__ == "__main__":
    import uvicorn
    print("🎯 Iniciando Uvicorn em 0.0.0.0:8000", file=sys.stderr)
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")
