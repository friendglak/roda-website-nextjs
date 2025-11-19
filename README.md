# Mini Roda - Sistema de Financiamiento de Vehículos Eléctricos

Este repositorio contiene la solución para la prueba técnica "Mini Roda", una aplicación full-stack para gestionar el financiamiento de vehículos eléctricos.

## 🚀 Arquitectura

La solución sigue una arquitectura de microservicios simplificada, orquestada con Docker Compose:

- **Frontend**: Next.js 15 (React) + Tailwind CSS. Encargado de la UI, Catálogo y Simulador.
- **Backend**: FastAPI (Python). API REST para gestión de clientes, vehículos, créditos y pagos.
- **Base de Datos**: PostgreSQL 15. Persistencia relacional.

Ver `ARCHITECTURE.md` para más detalles.

## 📋 Requisitos

- Docker y Docker Compose instalados.

## 🛠️ Ejecución

Para iniciar todo el ecosistema:

```bash
docker-compose up --build
```

Esto levantará:

- **Frontend**: `http://localhost:3000`
- **Backend API**: `http://localhost:8000`
- **Documentación API (Swagger)**: `http://localhost:8000/docs`
- **Base de Datos**: `localhost:5432`

## 🧪 Funcionalidades Implementadas

1. **Catálogo de Vehículos**:
   - Vista de lista en `/catalog`.
   - Datos consumidos desde la API Backend.
2. **Simulador de Crédito**:
   - Cálculo en tiempo real de cuotas.
   - Parámetros configurables (Plazo, Cuota Inicial).
3. **Solicitud de Crédito**:
   - Registro de Cliente (Nombre, Email, Teléfono).
   - Creación de Solicitud de Crédito en Base de Datos.
4. **API REST Completa**:
   - `GET /vehicles`: Listar vehículos.
   - `POST /clients`: Crear clientes.
   - `POST /credits`: Crear solicitudes.
   - `POST /payments`: Registrar pagos.

## 📁 Estructura del Proyecto

```bash
roda-website-nextjs/
├── app/                # Frontend Next.js
│   ├── catalog/        # Página de catálogo
│   ├── lib/            # Cliente API
│   └── ...
├── backend/            # Backend FastAPI
│   ├── app/
│   │   ├── main.py     # Endpoints
│   │   ├── models.py   # Modelos DB
│   │   └── crud.py     # Lógica DB
│   └── Dockerfile
├── components/         # Componentes React
│   ├── CreditModal.tsx # Modal de simulación
│   └── ...
├── docker-compose.yml  # Orquestación
└── ARCHITECTURE.md     # Documentación técnica
```

## 📝 Notas

- El backend inicializa la base de datos automáticamente al arrancar.
- Si el catálogo aparece vacío, asegúrate de crear algunos vehículos vía API (POST `/vehicles`) o usar los datos mock de fallback en el frontend.

---

Desarrollado por [Tu Nombre] para Roda.
