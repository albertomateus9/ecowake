CREATE TABLE IF NOT EXISTS ships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    class VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS fuel_consumption (
    id SERIAL PRIMARY KEY,
    ship_id INT REFERENCES ships(id) ON DELETE CASCADE,
    session_id VARCHAR(255),
    quantity FLOAT,
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    ship_id INT REFERENCES ships(id) ON DELETE CASCADE,
    fouling_level FLOAT,
    efficiency_index FLOAT,
    alert_status VARCHAR(50),
    predicted_critical_date DATE,
    co2_savings FLOAT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ship_id ON fuel_consumption(ship_id);
CREATE INDEX IF NOT EXISTS idx_timestamp ON fuel_consumption(timestamp);
CREATE INDEX IF NOT EXISTS idx_predictions_ship ON predictions(ship_id);

INSERT INTO ships (name, class) VALUES 
    ('Navio-001', 'Suezmax'),
    ('Navio-002', 'Aframax'),
    ('Navio-003', 'Suezmax')
ON CONFLICT (name) DO NOTHING;
