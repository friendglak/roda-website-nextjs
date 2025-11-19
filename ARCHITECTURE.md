# Arquitectura Mini Roda

Este documento describe la arquitectura de la solución "Mini Roda", un sistema de financiamiento para vehículos eléctricos.

## 1. Visión General

El sistema está diseñado como una aplicación web moderna compuesta por un **Frontend** en Next.js y un **Backend** en Python (FastAPI), orquestados mediante **Docker Compose**. La solución permite a los usuarios visualizar un catálogo de vehículos, simular créditos y enviar solicitudes de financiamiento.

### Diagrama de Alto Nivel

```mermaid
graph TD
    User[Usuario] -->|HTTP/HTTPS Port 80| Gateway[Nginx Gateway]
    Gateway -->|/| Frontend[Frontend (Next.js)]
    Gateway -->|/api| API[Backend API (FastAPI)]
    Frontend -->|Browser API Calls| Gateway
    API -->|SQL| DB[(PostgreSQL)]
    API -->|Cache| Redis[(Redis)]

    subgraph "Docker Compose / Cluster"
    Gateway
    Frontend
    API
    DB
    Redis
    end
```

## 2. Componentes del Sistema

### 2.1 API Gateway (Nginx)

- **Tecnología**: Nginx Alpine.
- **Responsabilidad**:
  - Punto de entrada único (Reverse Proxy).
  - Enrutamiento de tráfico (Frontend vs Backend).
  - Manejo de CORS simplificado.
  - Terminación SSL (simulada o extensible).

### 2.2 Frontend (Next.js)

- **Tecnología**: Next.js 14 (App Router), React, Tailwind CSS, GSAP.
- **Responsabilidad**: UI, Catálogo, Simulador.
- **Comunicación**: Consume `/api/*` a través del Gateway.

### 2.3 Backend (FastAPI)

- **Tecnología**: Python 3.11, FastAPI, SQLAlchemy, Pydantic.
- **Responsabilidad**: Lógica de negocio, CRUD.
- **Caché**: Implementación de **Redis** para cachear respuestas del catálogo (`GET /vehicles`), mejorando el tiempo de respuesta y reduciendo carga en la BD.

### 2.4 Base de Datos (PostgreSQL)

- **Tecnología**: PostgreSQL 15.
- **Responsabilidad**: Persistencia de datos relacionales.

### 2.5 Caché (Redis)

- **Tecnología**: Redis Alpine.
- **Responsabilidad**: Almacenamiento volátil de alta velocidad para datos frecuentemente leídos (Lista de vehículos).

## 3. Flujo de Datos (Optimizado)

1. **Navegación**: El usuario entra a `http://localhost/catalog`. Nginx sirve el Frontend.
2. **Consulta**: El Frontend pide `/api/vehicles`. Nginx redirige al Backend.
3. **Caché**:
   - El Backend revisa Redis.
   - **Hit**: Devuelve JSON inmediato (< 5ms).
   - **Miss**: Consulta PostgreSQL, guarda en Redis (TTL 1h) y devuelve JSON.

## 4. Despliegue e Infraestructura

```bash
docker-compose up --build
```

Todos los servicios se levantan coordinados en una red interna de Docker.

## 5. Decisiones de Diseño

- **Gateway**: Se añadió para desacoplar la ubicación física de los servicios del cliente. Permite escalar el backend sin cambiar el frontend.
- **Redis**: Se eligió por su simplicidad y performance para estructuras de datos simples como listas JSON.
- **Frontend Monolítico vs Microfrontends**: Se optó deliberadamente por una arquitectura modular dentro de un único repositorio Next.js en lugar de Microfrontends.
  - **Razón**: Para el alcance de este MVP, la complejidad operativa de orquestar múltiples despliegues independientes (Module Federation) supera los beneficios.
  - **Escalabilidad**: Next.js permite separar responsabilidades vía Server Components y módulos. Si el equipo creciera a múltiples squads independientes, la migración a Microfrontends sería el siguiente paso lógico.
