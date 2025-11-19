***“Construye un mini Roda de punta a punta”***

### 1. Contexto y Objetivo General

En Roda financiamos vehículos eléctricos livianos (e-bikes, e-mopeds, scooters, etc.) para repartidores, microemprendedores y personas que quieren moverse mejor en la ciudad.

En esta prueba te proponemos construir un **“mini Roda”**: un pequeño ecosistema de servicios y una aplicación web que simule, de forma simple pero completa, un flujo real de **financiamiento de motocicletas y vehículos eléctricos**, desde el registro del cliente hasta el pago de las cuotas.

La solución debe incluir:

1. **Backend en Python** (FastAPI, Django o Flask).
2. **Frontend en React**.
3. **Despliegue con Docker + Kubernetes**.
4. **Base de datos relacional** (idealmente PostgreSQL).
5. **Arquitectura basada en microservicios** con un API Gateway.
6. **Microfrontends** administrados con Webpack o Vite.
7. **CI/CD funcional** (aunque sea simple).
8. Uso de servicio en la nube (Un bucket de archivos, la BD, lo que consideres más práctico)
9. **Documentación técnica completa**: arquitectura, decisiones de diseño, patrones y UML.

> 💡 Libertad de diseño/infraestructura:
> 
> 
> Si consideras que otra arquitectura, herramienta o servicio hace más sentido, **puedes proponer cambios** siempre y cuando la **justificación técnica y de negocio sea muy sólida y esté bien documentada**.
> 

---

### 2. Alcance Funcional

Tu solución debe permitir, como mínimo:

1. **Gestión de clientes**
    - Crear clientes.
    - Consultar detalle de un cliente.
    - Listar clientes.
2. **Gestión de catálogo de vehículos**
    - Categorización por tipo de vehículo (e-bike, e-moped, scooter, etc.).
    - Marcas y referencias.
    - Consulta y listado del catálogo.
3. **Simulación de créditos**
    - Monto a financiar.
    - Tasa de interés.
    - Número y valor de las cuotas.
    - Valor total financiado.
4. **Solicitud y aprobación de créditos**
    - Creación de una solicitud de crédito.
    - Aprobación o rechazo (puede ser con reglas simples).
    - Generación de un calendario de pagos.
5. **Registro de pagos**
    - Registrar pagos sobre un crédito.
    - Actualizar el estado del crédito (al día, en mora, pagado, etc.).

No buscamos algo perfecto o enorme, sino un **MVP razonable** que nos permita ver cómo piensas, diseñas y construyes software de punta a punta.

---

### Es un plus

- Uso de **Redis** para sesiones o caché de datos frecuentes.
- **API Gateway:** Puedes usar Traefik, Kong, Nginx o construir uno propio simple.

> 🛠️ De nuevo, si decides variar esta arquitectura (otro gateway, otro esquema de despliegue, etc.), explícanos muy bien el porqué: qué problema resuelves y qué trade-offs asumes.
> 

---

### 4. Documentación Requerida

Queremos poder entender tu solución sin tener que leer código línea por línea.

Incluye al menos:

1. Documento Arquitectónico con diagrama general.

2. UML: clases, componentes y secuencia.

3. Patrones de diseño aplicados.

4. Guía de despliegue (local y CI/CD).

5. Manual de uso y pruebas de endpoints (Preferiblemente con Swagger)

---

### 5. Criterios de Evaluación (100 puntos)

Así evaluaremos tu prueba:

- **Modelo de negocio (15 puntos)**
    
    Qué tan bien modelas el flujo de financiamiento y la realidad de un crédito para vehículos eléctricos.
    
- **Funcionalidad (30 puntos)**
    
    Qué tanto del alcance funcional logras implementar y qué tan bien funciona.
    
- **Calidad de código (15 puntos)**
    
    Legibilidad, organización, buenas prácticas, tests, manejo de errores.
    
- **Arquitectura y diseño (15 puntos)**
    
    Diseño de microservicios, separación de responsabilidades, patrones de diseño.
    
- **DevOps / Infraestructura (10 puntos)**
    
    Contenerización, Kubernetes, CI/CD, uso de servicios cloud.
    
- **Experiencia de usuario (10 puntos)**
    
    Claridad del flujo en el frontend, facilidad de uso, navegación.
    
- **Valor agregado (5 puntos)**
    
    Cualquier extra que sume: métricas, monitoreo, mejoras de seguridad, UX adicional, ideas de negocio, etc.
    

---

### 6. Tiempos para realizar la prueba

- **Inicio de la prueba:**
    
    15 de noviembre de 2025 — 00:00
    
- **Fin de la prueba:**
    
    18 de noviembre de 2025 — 23:59
    

> ⏱️ Trata de equilibrar ambición y foco: preferimos algo estable, bien pensado y bien explicado, a algo gigantesco pero frágil.
> 

---

### 7. Entregables

Al finalizar, envíanos:

1. **Repositorio Git**
2. **Documentación solicitada**
3. **Aplicación desplegada**.

---

### 8. Entrevista de seguimiento

Después de la entrega:

- Programaremos una **entrevista técnica** para revisar tu solución, discutir tus decisiones y profundizar en el diseño.
- Estas entrevistas se **agendarán entre miércoles y jueves** posteriores al cierre de la prueba
    
    (para este ciclo: **19 y 20 de noviembre de 2025**).
    

En esa conversación nos interesa entender **cómo piensas**, cómo priorizas y cómo tomas decisiones bajo restricciones de tiempo y recursos.

---

Si algo no te alcanza a quedar perfecto, no pasa nada: explícalo en la documentación.

Esta prueba es tanto sobre **tu forma de trabajar** como sobre el resultado final. 🚀