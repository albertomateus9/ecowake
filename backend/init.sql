-- Tabela de navios com campos AIS
CREATE TABLE IF NOT EXISTS ships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(50) DEFAULT 'Operando',
    biofouling_level INT DEFAULT 0 CHECK (biofouling_level >= 0 AND biofouling_level <= 4),
    fuel_consumption DECIMAL(10, 2),
    speed DECIMAL(10, 2),
    last_latitude DECIMAL(10, 8),
    last_longitude DECIMAL(11, 8),
    destination VARCHAR(255),
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Histórico de posições AIS
CREATE TABLE IF NOT EXISTS ais_positions (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    speed DECIMAL(10, 2),
    course INT,
    timestamp TIMESTAMP NOT NULL
);

-- Histórico de manutenção
CREATE TABLE IF NOT EXISTS maintenance_history (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    maintenance_type VARCHAR(100),
    scheduled_date DATE,
    completed_date DATE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Recomendações automáticas
CREATE TABLE IF NOT EXISTS recommendations (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    recommendation TEXT NOT NULL,
    priority VARCHAR(20) DEFAULT 'Medium',
    risk_level INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Alertas
CREATE TABLE IF NOT EXISTS alerts (
    id SERIAL PRIMARY KEY,
    ship_id INT NOT NULL REFERENCES ships(id) ON DELETE CASCADE,
    alert_type VARCHAR(100),
    message TEXT,
    severity VARCHAR(20),
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_ships_status ON ships(status);
CREATE INDEX IF NOT EXISTS idx_ships_biofouling ON ships(biofouling_level);
CREATE INDEX IF NOT EXISTS idx_ais_positions_ship_id ON ais_positions(ship_id, timestamp);
CREATE INDEX IF NOT EXISTS idx_maintenance_ship_id ON maintenance_history(ship_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_ship_id ON recommendations(ship_id);
CREATE INDEX IF NOT EXISTS idx_alerts_ship_id ON alerts(ship_id, resolved);

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ships_update_timestamp
BEFORE UPDATE ON ships
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
