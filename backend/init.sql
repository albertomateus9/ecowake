-- Create tables
CREATE TABLE IF NOT EXISTS ships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL DEFAULT 'Operando',
    biofouling_level INT DEFAULT 0,
    fuel_consumption DECIMAL(10, 2),
    speed DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS maintenance_schedules (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id),
    scheduled_date DATE,
    description VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id),
    recommendation VARCHAR(500),
    priority VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert test data
INSERT INTO ships (name, status, biofouling_level, fuel_consumption, speed) 
VALUES 
    ('RAFAEL SANTOS', 'Operando', 2, 45.5, 14.2),
    ('TRANSPETRO BRASIL', 'Manutenção', 3, 52.1, 0),
    ('OCEANO EXPRESS', 'Operando', 1, 38.2, 16.5),
    ('SUEZMAX 01', 'Operando', 2, 48.9, 15.1)
ON CONFLICT (name) DO NOTHING;

INSERT INTO recommendations (ship_id, recommendation, priority)
SELECT id, 'Agendar limpeza urgente', 'High' FROM ships WHERE name = 'TRANSPETRO BRASIL'
UNION ALL
SELECT id, 'Monitorar proximamente', 'Medium' FROM ships WHERE name = 'RAFAEL SANTOS'
UNION ALL
SELECT id, 'Status normal', 'Low' FROM ships WHERE name = 'OCEANO EXPRESS'
ON CONFLICT DO NOTHING;

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ships_status ON ships(status);
CREATE INDEX IF NOT EXISTS idx_ships_biofouling ON ships(biofouling_level);
CREATE INDEX IF NOT EXISTS idx_maintenance_ship_id ON maintenance_schedules(ship_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_ship_id ON recommendations(ship_id);

-- Adicionar campos para dados AIS
ALTER TABLE ships ADD COLUMN IF NOT EXISTS last_latitude DECIMAL(10, 8);
ALTER TABLE ships ADD COLUMN IF NOT EXISTS last_longitude DECIMAL(11, 8);
ALTER TABLE ships ADD COLUMN IF NOT EXISTS last_update TIMESTAMP;

-- Criar tabela de histórico AIS
CREATE TABLE IF NOT EXISTS ais_history (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    speed DECIMAL(10, 2),
    heading INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_ais_history_ship_id ON ais_history(ship_id);
CREATE INDEX IF NOT EXISTS idx_ais_history_timestamp ON ais_history(timestamp);
