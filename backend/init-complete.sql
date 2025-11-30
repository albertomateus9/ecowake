-- ============================================
-- EcoWake - SQL Init Script
-- PostgreSQL Database Setup
-- ============================================

-- 1. CRIAR TABELA DE NAVIOS
CREATE TABLE IF NOT EXISTS ships (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    class VARCHAR(50) NOT NULL,
    type VARCHAR(50),
    porte INT,
    length DECIMAL(5,2),
    cruiser_type VARCHAR(10),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. CRIAR TABELA DE DOCAGENS
CREATE TABLE IF NOT EXISTS dockings (
    id SERIAL PRIMARY KEY,
    ship_id INT REFERENCES ships(id) ON DELETE CASCADE,
    docking_date DATE NOT NULL,
    docking_type VARCHAR(50),
    duration_days INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. CRIAR TABELA DE REVESTIMENTO
CREATE TABLE IF NOT EXISTS coatings (
    id SERIAL PRIMARY KEY,
    ship_id INT REFERENCES ships(id) ON DELETE CASCADE,
    coating_type VARCHAR(10),
    application_date DATE,
    verification_period INT,
    max_downtime INT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 4. CRIAR TABELA DE PREDIÇÕES
CREATE TABLE IF NOT EXISTS predictions (
    id SERIAL PRIMARY KEY,
    ship_id INT REFERENCES ships(id) ON DELETE CASCADE,
    fouling_level DECIMAL(5,2),
    efficiency_index DECIMAL(5,2),
    alert_status VARCHAR(50),
    predicted_critical_date DATE,
    co2_savings DECIMAL(8,2),
    prediction_date TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW()
);

-- 5. CRIAR TABELA DE SENSOR DATA
CREATE TABLE IF NOT EXISTS sensor_data (
    id SERIAL PRIMARY KEY,
    ship_id INT REFERENCES ships(id) ON DELETE CASCADE,
    sensor_type VARCHAR(50),
    value DECIMAL(10,2),
    timestamp TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_ships_class ON ships(class);
CREATE INDEX IF NOT EXISTS idx_dockings_ship ON dockings(ship_id);
CREATE INDEX IF NOT EXISTS idx_dockings_date ON dockings(docking_date);
CREATE INDEX IF NOT EXISTS idx_predictions_ship ON predictions(ship_id);
CREATE INDEX IF NOT EXISTS idx_sensor_data_ship ON sensor_data(ship_id);
CREATE INDEX IF NOT EXISTS idx_sensor_data_timestamp ON sensor_data(timestamp);

-- ============================================
-- INSERIR 21 NAVIOS TRANSPETRO
-- ============================================
INSERT INTO ships (name, class, type, porte, length, cruiser_type) VALUES
-- SUEZMAX (8 navios)
('RAFAEL SANTOS', 'Suezmax', 'Petroleiro', 156628, 274.2, '56'),
('HENRIQUE ALVES', 'Suezmax', 'Petroleiro', 157700, 274.2, '56'),
('VICTOR OLIVEIRA', 'Suezmax', 'Petroleiro', 156492, 274.2, '56'),
('FELIPE RIBEIRO', 'Suezmax', 'Petroleiro', 157700, 274.2, '56'),
('GISELLE CARVALHO', 'Suezmax', 'Petroleiro', 156504, 274.2, '56'),
('RAUL MARTINS', 'Suezmax', 'Petroleiro', 156523, 274.2, '56'),
('PAULO MOURA', 'Suezmax', 'Petroleiro', 156547, 274.2, '56'),
('MARCOS CAVALCANTI', 'Suezmax', 'Petroleiro', 156733, 274.2, '56'),
-- AFRAMAX (5 navios)
('DANIEL PEREIRA', 'Aframax', 'Petroleiro', 114562, 249, '57'),
('CARLA SILVA', 'Aframax', 'Petroleiro', 114365, 249, '57'),
('RENATO GOMES', 'Aframax', 'Petroleiro', 114481, 249, '57'),
('GABRIELA MARTINS', 'Aframax', 'Petroleiro', 114441, 249, '57'),
('RODRIGO PINHEIRO', 'Aframax', 'Petroleiro', 114434, 249, '57'),
-- MR2 (4 navios)
('EDUARDO COSTA', 'MR 2', 'Petroleiro', 48501, 182.85, '59'),
('THIAGO FERNANDES', 'MR 2', 'Petroleiro', 48573, 182.85, '59'),
('ROMARIO SILVA', 'MR 2', 'Petroleiro', 48449, 182.85, '59'),
('LUCAS MENDONÇA', 'MR 2', 'Petroleiro', 48573, 182.85, '59'),
-- GASEIRO 7K (4 navios)
('RICARDO BARBOSA', 'Gaseiro 7k', 'Gaseiro', 5079, 117.63, '61'),
('BRUNO LIMA', 'Gaseiro 7k', 'Gaseiro', 5095, 117.63, '61'),
('FÁBIO SANTOS', 'Gaseiro 7k', 'Gaseiro', 5092, 117.63, '61'),
('MARIA VALENTINA', 'Gaseiro 7k', 'Gaseiro', 5097, 117.63, '61')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- INSERIR DADOS DE DOCAGENS
-- ============================================
INSERT INTO dockings (ship_id, docking_date, docking_type, duration_days) 
SELECT id, '2022-07-08'::DATE, 'Especial', 30 FROM ships WHERE name = 'RAFAEL SANTOS'
UNION ALL
SELECT id, '2022-11-09'::DATE, 'Especial', 28 FROM ships WHERE name = 'HENRIQUE ALVES'
UNION ALL
SELECT id, '2023-06-30'::DATE, 'Rotineira', 25 FROM ships WHERE name = 'VICTOR OLIVEIRA'
UNION ALL
SELECT id, '2024-06-20'::DATE, 'Especial', 30 FROM ships WHERE name = 'FELIPE RIBEIRO'
UNION ALL
SELECT id, '2025-03-22'::DATE, 'Rotineira', 20 FROM ships WHERE name = 'GISELLE CARVALHO'
UNION ALL
SELECT id, '2025-05-10'::DATE, 'Especial', 28 FROM ships WHERE name = 'RAUL MARTINS'
UNION ALL
SELECT id, '2025-11-01'::DATE, 'Rotineira', 22 FROM ships WHERE name = 'PAULO MOURA'
UNION ALL
SELECT id, '2021-05-08'::DATE, 'Especial', 32 FROM ships WHERE name = 'MARCOS CAVALCANTI'
UNION ALL
SELECT id, '2023-09-13'::DATE, 'Rotineira', 24 FROM ships WHERE name = 'DANIEL PEREIRA'
UNION ALL
SELECT id, '2024-02-26'::DATE, 'Especial', 27 FROM ships WHERE name = 'CARLA SILVA'
UNION ALL
SELECT id, '2024-01-07'::DATE, 'Rotineira', 21 FROM ships WHERE name = 'RENATO GOMES'
UNION ALL
SELECT id, '2024-04-13'::DATE, 'Especial', 29 FROM ships WHERE name = 'GABRIELA MARTINS'
UNION ALL
SELECT id, '2024-08-26'::DATE, 'Rotineira', 23 FROM ships WHERE name = 'RODRIGO PINHEIRO'
UNION ALL
SELECT id, '2022-02-14'::DATE, 'Especial', 26 FROM ships WHERE name = 'EDUARDO COSTA'
UNION ALL
SELECT id, '2023-01-18'::DATE, 'Rotineira', 20 FROM ships WHERE name = 'THIAGO FERNANDES'
UNION ALL
SELECT id, '2023-05-18'::DATE, 'Especial', 30 FROM ships WHERE name = 'ROMARIO SILVA'
UNION ALL
SELECT id, '2024-02-13'::DATE, 'Rotineira', 19 FROM ships WHERE name = 'LUCAS MENDONÇA'
UNION ALL
SELECT id, '2025-10-06'::DATE, 'Especial', 18 FROM ships WHERE name = 'RICARDO BARBOSA'
UNION ALL
SELECT id, '2021-09-18'::DATE, 'Rotineira', 15 FROM ships WHERE name = 'BRUNO LIMA'
UNION ALL
SELECT id, '2022-02-09'::DATE, 'Especial', 22 FROM ships WHERE name = 'FÁBIO SANTOS'
UNION ALL
SELECT id, '2022-04-28'::DATE, 'Rotineira', 16 FROM ships WHERE name = 'MARIA VALENTINA'
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERIR DADOS DE REVESTIMENTO (COATING)
-- ============================================
INSERT INTO coatings (ship_id, coating_type, application_date, verification_period, max_downtime)
SELECT id, '56', '2020-01-15'::DATE, 35, 120 FROM ships WHERE class = 'Suezmax'
UNION ALL
SELECT id, '57', '2020-06-20'::DATE, 28, 100 FROM ships WHERE class = 'Aframax'
UNION ALL
SELECT id, '59', '2021-03-10'::DATE, 35, 90 FROM ships WHERE class = 'MR 2'
UNION ALL
SELECT id, '61', '2020-11-05'::DATE, 52, 60 FROM ships WHERE class = 'Gaseiro 7k'
ON CONFLICT DO NOTHING;

-- ============================================
-- INSERIR PREDIÇÕES DE EXEMPLO
-- ============================================
INSERT INTO predictions (ship_id, fouling_level, efficiency_index, alert_status, predicted_critical_date, co2_savings)
SELECT id, 
        ROUND((RANDOM() * 100)::numeric, 1) as fouling_level,
        ROUND((100 - (RANDOM() * 15))::numeric, 1) as efficiency_index,
        CASE WHEN RANDOM() > 0.7 THEN 'RED' WHEN RANDOM() > 0.4 THEN 'YELLOW' ELSE 'GREEN' END as alert_status,
        CURRENT_DATE + (RANDOM() * 180)::int as predicted_critical_date,
        ROUND((RANDOM() * 500)::numeric, 2) as co2_savings
FROM ships
ON CONFLICT DO NOTHING;

-- ============================================
-- VERIFICAÇÃO FINAL
-- ============================================
SELECT 'Total de Navios' as metric, COUNT(*)::text FROM ships
UNION ALL
SELECT 'Total de Docagens', COUNT(*)::text FROM dockings
UNION ALL
SELECT 'Total de Revestimentos', COUNT(*)::text FROM coatings
UNION ALL
SELECT 'Total de Predições', COUNT(*)::text FROM predictions;