# EcoWake

Applied AI and data platform concept for predictive biofouling monitoring in maritime operations.

## Overview

EcoWake was developed in a hackathon context to explore how operational data, dashboards, and predictive analysis can support hull-cleaning decisions and reduce fuel waste in maritime fleets.

The repository combines a FastAPI backend, PostgreSQL data storage, a dashboard layer, and containerized deployment assets.

## Problem

Biofouling increases drag, fuel consumption, emissions, and maintenance uncertainty. Teams need visibility into vessel status, risk levels, maintenance windows, and operational impact before performance losses become expensive.

## Solution Concept

- Collect and expose vessel indicators through a backend API.
- Store ship status, biofouling level, fuel consumption, and recommendations.
- Present operational insights through dashboards.
- Support future predictive models for cleaning-window optimization.

## Architecture

- `backend/`: FastAPI service and database integration.
- `dashboard/`: analytical dashboard application.
- `frontend/`: web presentation layer.
- `nginx/`: reverse-proxy configuration for deployment.
- `docker-compose.yml`: local/container orchestration.

## Stack

- Python, FastAPI, Uvicorn
- PostgreSQL
- Docker and Docker Compose
- Nginx
- Dashboard/data visualization tooling

## Getting Started

```bash
git clone https://github.com/albertomateus9/ecowake.git
cd ecowake
docker compose up --build
```

Backend health endpoint:

```bash
curl http://localhost:8000/health
```

## Development Direction

- Replace demonstration credentials with environment-managed secrets for production use.
- Add tests for API endpoints and database access.
- Add model-training and evaluation notebooks or scripts.
- Document dashboard data sources and refresh strategy.
- Add deployment notes for staging versus production.

## Professional Context

EcoWake highlights applied AI, data storytelling, backend APIs, infrastructure deployment, and the ability to convert a domain problem into an engineering prototype.

## License

MIT. See [LICENSE](LICENSE).
