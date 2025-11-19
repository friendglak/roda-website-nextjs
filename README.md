# Roda Website - Next.js + Three.js

Sitio web moderno para Roda, una fintech que financia la movilidad eléctrica en Latinoamérica. Construido con Next.js 15, React, Tailwind CSS, GSAP y React Three Fiber con efecto ASCII.

## 🚀 Características

- **Next.js 15**: Framework React con App Router
- **TypeScript**: Tipado fuerte para mayor seguridad
- **Tailwind CSS**: Estilos utilitarios con configuración personalizada
- **GSAP**: Animaciones fluidas y scroll triggers
- **React Three Fiber**: Gráficos 3D con efecto ASCII
- **Efecto ASCII**: Visualización ASCII en tiempo real usando Three.js y postprocessing
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Animaciones**: Loader, scroll animations, hover effects

## 📦 Instalación

```bash
npm install
```

## 🏃 Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`

## 🏗️ Build

```bash
npm run build
```

## 🚀 Producción

```bash
npm start
```

## 📁 Estructura del Proyecto

```
roda-website/
├── app/
│   ├── layout.tsx          # Layout principal con metadata
│   ├── page.tsx            # Página principal
│   └── globals.css         # Estilos globales
├── components/
│   ├── ascii-effect.tsx    # Componente del efecto ASCII
│   ├── ascii-scene.tsx     # Escena Three.js con efecto ASCII
│   ├── Hero.tsx            # Componente Hero
│   ├── Navigation.tsx      # Navegación
│   ├── Loader.tsx          # Loader inicial
│   ├── PartnersMarquee.tsx # Marquee de partners
│   ├── HowItWorks.tsx      # Sección "Cómo funciona"
│   ├── Benefits.tsx        # Sección de beneficios
│   ├── Stats.tsx           # Estadísticas
│   ├── Testimonials.tsx    # Testimonios
│   ├── FAQ.tsx             # Preguntas frecuentes
│   ├── CTA.tsx             # Call to action
│   ├── Footer.tsx          # Footer
│   └── CreditModal.tsx     # Modal de crédito
├── public/                 # Archivos estáticos
├── next.config.js          # Configuración de Next.js
├── tailwind.config.ts      # Configuración de Tailwind
├── tsconfig.json           # Configuración de TypeScript
└── package.json            # Dependencias
```

## 🎨 Personalización

### Colores de marca

Los colores están definidos en `tailwind.config.ts`:

- `roda-green`: #CFFC00
- `dark-bg`: #121212
- `light-text`: #F4F4F0
- `gray-text`: #A0A0A0

### Efecto ASCII

El efecto ASCII se puede personalizar en `components/ascii-scene.tsx` modificando las propiedades del `postfx`:

- `cellSize`: Tamaño de las celdas ASCII
- `colorPalette`: Paleta de colores (1=Green, 2=Amber, 3=Cyan, 4=Blue)
- `noiseIntensity`: Intensidad del ruido
- `glitchIntensity`: Intensidad del efecto glitch
- Y muchas más opciones...

## 📚 Tecnologías Utilizadas

- **Next.js** 15+
- **React** 19+
- **TypeScript** 5+
- **Tailwind CSS** 4+
- **GSAP** 3+
- **Three.js** 0.181+
- **React Three Fiber** 9+
- **@react-three/drei** 10+
- **@react-three/postprocessing** 3+
- **postprocessing** 6+
- **Phosphor Icons** - Iconos

## 🎯 Próximos Pasos

- [ ] Integrar backend para formularios
- [ ] Agregar más efectos visuales
- [ ] Optimizar rendimiento
- [ ] Agregar tests
- [ ] SEO optimization
- [ ] Internacionalización (i18n)

## 📝 Licencia

Todos los derechos reservados © 2024 Roda
