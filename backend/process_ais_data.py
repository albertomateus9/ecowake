#!/usr/bin/env python3
"""
Processar dados AIS e calcular métricas de bioincrustação
"""
import os
import csv
import psycopg2
from psycopg2.extras import execute_values
from datetime import datetime, timedelta
from statistics import mean, median
import sys

DB_HOST = os.getenv("DB_HOST", "postgres")
DB_PORT = int(os.getenv("DB_PORT", 5432))
DB_NAME = os.getenv("DB_NAME", "ecowake_db")
DB_USER = os.getenv("DB_USER", "ecowake")
DB_PASSWORD = os.getenv("DB_PASSWORD", "ecowake_secure_2025")

CSV_FOLDER = "/app/data/ais"

class AISProcessor:
    def __init__(self):
        self.conn = None
        self.ship_specs = {
            "Oil Tanker": {"draft": 12.0, "fuel_consumption_base": 80},
            "Bulk Carrier": {"draft": 11.5, "fuel_consumption_base": 70},
            "General Cargo": {"draft": 9.0, "fuel_consumption_base": 50},
            "Container": {"draft": 12.5, "fuel_consumption_base": 120},
            "Ro-Ro": {"draft": 8.5, "fuel_consumption_base": 45},
        }
    
    def connect(self):
        self.conn = psycopg2.connect(
            host=DB_HOST, port=DB_PORT, database=DB_NAME,
            user=DB_USER, password=DB_PASSWORD
        )
    
    def process_csv(self, filepath, ship_name):
        """Extrair dados relevantes do CSV"""
        try:
            with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                reader = csv.DictReader(f)
                rows = list(reader)
            
            if not rows:
                return None
            
            # Extrair estatísticas
            speeds = []
            lats = []
            lons = []
            
            for row in rows:
                try:
                    if row.get('Speed Over Ground'):
                        speeds.append(float(row['Speed Over Ground']))
                    if row.get('Latitude'):
                        lats.append(float(row['Latitude']))
                    if row.get('Longitude'):
                        lons.append(float(row['Longitude']))
                except (ValueError, TypeError):
                    pass
            
            latest = rows[-1]
            
            return {
                'name': ship_name,
                'avg_speed': mean(speeds) if speeds else 0,
                'max_speed': max(speeds) if speeds else 0,
                'last_speed': float(latest.get('Speed Over Ground', 0) or 0),
                'last_lat': mean(lats) if lats else 0,
                'last_lon': mean(lons) if lons else 0,
                'record_count': len(rows),
                'draught': float(latest.get('Draught', 10) or 10),
                'destination': latest.get('Destination', 'Unknown'),
                'eta': latest.get('ETA', None),
                'status': 'Operando' if speeds and mean(speeds) > 1 else 'Parado'
            }
        except Exception as e:
            print(f"❌ Erro ao processar {filepath}: {e}", file=sys.stderr)
            return None
    
    def calculate_biofouling(self, days_since_maintenance=30, avg_speed=12, status='Operando'):
        """Calcular nível de bioincrustação (0-4)"""
        if status == 'Manutenção':
            return 0
        
        # Quanto menos velocidade, mais bioincrustação
        speed_factor = 1 - (avg_speed / 20) if avg_speed < 20 else 0
        
        # Quanto mais tempo sem manutenção, mais bioincrustação
        time_factor = min(days_since_maintenance / 180, 1.0)
        
        # Combinar fatores
        biofouling = int((speed_factor * 2 + time_factor * 2))
        return min(biofouling, 4)
    
    def calculate_fuel_consumption(self, ship_type='Oil Tanker', speed=12, length=180):
        """Calcular consumo de combustível estimado"""
        specs = self.ship_specs.get(ship_type, {"fuel_consumption_base": 60})
        base = specs["fuel_consumption_base"]
        
        # Consumo aumenta com velocidade^3
        speed_multiplier = (speed / 13) ** 3 if speed > 0 else 0
        
        # Considerar tamanho
        size_multiplier = length / 170
        
        return max(base * speed_multiplier * size_multiplier, 10)
    
    def import_all_ships(self):
        """Importar todos os CSVs"""
        self.connect()
        cur = self.conn.cursor()
        
        ships_data = []
        
        if os.path.exists(CSV_FOLDER):
            for filename in sorted(os.listdir(CSV_FOLDER)):
                if filename.endswith('.csv'):
                    filepath = os.path.join(CSV_FOLDER, filename)
                    ship_name = filename.replace('.csv', '').upper()
                    
                    print(f"📄 Processando {ship_name}...", file=sys.stderr, end=" ")
                    data = self.process_csv(filepath, ship_name)
                    
                    if data:
                        print("✅", file=sys.stderr)
                        ships_data.append(data)
                    else:
                        print("⏭️", file=sys.stderr)
        
        if not ships_data:
            print("⚠️  Nenhum CSV encontrado.", file=sys.stderr)
            return
        
        # Inserir dados
        try:
            for ship in ships_data:
                biofouling = self.calculate_biofouling(
                    days_since_maintenance=30,
                    avg_speed=ship['avg_speed'],
                    status=ship['status']
                )
                
                fuel_consumption = self.calculate_fuel_consumption(
                    ship_type='Oil Tanker',
                    speed=ship['avg_speed'],
                    length=183
                )
                
                cur.execute("""
                    INSERT INTO ships 
                    (name, status, biofouling_level, fuel_consumption, speed, 
                     last_latitude, last_longitude, destination, last_update)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    ON CONFLICT (name) DO UPDATE SET
                        status = EXCLUDED.status,
                        biofouling_level = EXCLUDED.biofouling_level,
                        fuel_consumption = EXCLUDED.fuel_consumption,
                        speed = EXCLUDED.speed,
                        last_latitude = EXCLUDED.last_latitude,
                        last_longitude = EXCLUDED.last_longitude,
                        destination = EXCLUDED.destination,
                        last_update = EXCLUDED.last_update
                """, (
                    ship['name'],
                    ship['status'],
                    biofouling_level=biofouling,
                    fuel_consumption=fuel_consumption,
                    speed=ship['avg_speed'],
                    lat=ship['last_lat'],
                    lon=ship['last_lon'],
                    dest=ship['destination'],
                    now=datetime.now()
                ))
            
            self.conn.commit()
            print(f"\n✅ {len(ships_data)} navios importados!\n", file=sys.stderr)
        
        except Exception as e:
            print(f"❌ Erro ao inserir: {e}", file=sys.stderr)
            self.conn.rollback()
        finally:
            cur.close()
            self.conn.close()

if __name__ == "__main__":
    processor = AISProcessor()
    processor.import_all_ships()
