# Arquitectura Mini Roda

Este documento describe la arquitectura de la solución "Mini Roda", un sistema de financiamiento para vehículos eléctricos.

## 1. Visión General

El sistema está diseñado como una aplicación web moderna compuesta por un **Frontend** en Next.js y un **Backend** en Python (FastAPI), orquestados mediante **Docker Compose**. La solución permite a los usuarios visualizar un catálogo de vehículos, simular créditos y enviar solicitudes de financiamiento, además de proveer un portal administrativo seguro.

### Diagrama de Alto Nivel

```mermaid
graph TD
    User[Usuario Público] -->|HTTP/HTTPS Port 80| Gateway[Nginx Gateway]
    Admin[Administrador] -->|HTTP/HTTPS Port 80| Gateway

    Gateway -->|/| Frontend[Frontend (Next.js)]
    Gateway -->|/api| API[Backend API (FastAPI)]

    Frontend -->|Public API Calls| Gateway
    Frontend -->|Auth API Calls (JWT)| Gateway

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

### 2.2 Frontend (Next.js)

- **Tecnología**: Next.js 14 (App Router), React, Tailwind CSS, GSAP.
- **Módulos**:
  - **Público**: Catálogo, Simulador, Landing Page.
  - **Privado (Portal)**: Dashboard de administración protegido con gestión de pagos.
- **Comunicación**: Consume `/api/*` a través del Gateway.

### 2.3 Backend (FastAPI)

- **Tecnología**: Python 3.11, FastAPI, SQLAlchemy, Pydantic.
- **Seguridad**: Implementación de **OAuth2 con JWT** (JSON Web Tokens) y hashing de contraseñas con **Bcrypt**.
- **Responsabilidad**: Lógica de negocio, CRUD, Autenticación, Lógica de Pagos.
- **Caché**: Redis para optimizar lecturas frecuentes.

### 2.4 Base de Datos (PostgreSQL)

- **Tecnología**: PostgreSQL 15.
- **Modelos**: Clientes, Vehículos, Solicitudes de Crédito, Pagos.

### 2.5 Caché (Redis)

- **Tecnología**: Redis Alpine.
- **Responsabilidad**: Caché de catálogo de vehículos (TTL 10 min) e invalidación automática al crear nuevos items.

## 3. Seguridad y Flujos

### 3.1 Autenticación (Admin)

El sistema implementa un esquema de seguridad basado en roles (simplificado para MVP):

1. **Login**: El admin envía credenciales a `POST /api/token`.
2. **JWT**: El backend valida y devuelve un `access_token` firmado.
3. **Almacenamiento**: El frontend guarda el token de forma segura.
4. **Protección**: Endpoints sensibles (`GET /credits`, `POST /vehicles`, `POST /payments`) requieren el header `Authorization: Bearer <token>`.

### 3.2 Flujo de Datos (Optimizado)

1. **Navegación**: El usuario entra a `http://localhost/catalog`.
2. **Consulta**: El Frontend pide `/api/vehicles`.
3. **Caché**:
   - **Hit**: Redis devuelve JSON inmediato (< 5ms).
   - **Miss**: Consulta PostgreSQL, guarda en Redis y devuelve.

## 4. Despliegue e Infraestructura

### Desarrollo Local

```bash
docker-compose up --build
```

### Producción (Kubernetes)

Se incluyen manifiestos en `infra/k8s/` para despliegue en clúster.

### CI/CD

Pipeline configurado en `.github/workflows/ci-cd.yaml` para build y test automático.

## 5. Decisiones de Diseño

- **Gateway**: Desacopla la ubicación física de los servicios.
- **JWT vs Sesiones**: Se eligió JWT por ser stateless, ideal para escalar el backend horizontalmente sin almacenamiento de sesión centralizado.
- **Redis**: Se eligió por su simplicidad y performance para estructuras de datos simples como listas JSON.
- **Frontend Monolítico**: Se mantiene una arquitectura modular dentro de un único repo Next.js para agilidad en el MVP, pero con clara separación de rutas (`/app/catalog` vs `/app/portal`).
- **Registro de Pagos (Manual)**: Para este MVP, se implementó el registro de pagos a través del Portal Administrativo, simulando un proceso de recaudo manual o conciliación bancaria. En un entorno productivo, esto sería reemplazado por una integración con pasarela de pagos (Wompi/Stripe) accesible directamente por el usuario final.
