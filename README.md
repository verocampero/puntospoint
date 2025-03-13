# Cashback Dashboard

Este proyecto es parte de un challenge y consiste en un dashboard de cashback desarrollado con **React y Next.js**, utilizando **Material UI** para el diseño y **React Query** para la gestión de datos asíncronos.

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/) - Framework de React
- [React](https://reactjs.org/) - Biblioteca para interfaces de usuario
- [Material UI](https://mui.com/) - Componentes UI modernos y personalizables
- [React Query](https://tanstack.com/query/latest) - Manejo eficiente de estado asíncrono
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático para mayor seguridad

## 📦 Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```

2. Instala las dependencias:
   ```sh
   npm install
   # o
   yarn install
   ```

## ▶️ Ejecución del proyecto

### Modo desarrollo

```sh
npm run dev
# o
yarn dev
```

El servidor estará disponible en `http://localhost:3000`.

### Construcción y producción

Para compilar y ejecutar el proyecto en producción:

```sh
npm run build
npm start
```

## 📁 Estructura del proyecto

```
📂 tu-proyecto
├── 📂 components   # Componentes reutilizables
│   ├── CashbackDashboard.tsx  # Dashboard de cashback
│   ├── ...
├── 📂 pages        # Rutas de la aplicación (Next.js)
│   ├── index.tsx  # Página principal
│   ├── api/datos.ts # API Mock o conexión con backend
├── 📂 styles       # Estilos globales
├── 📂 utils        # Funciones y helpers
├── next.config.js  # Configuración de Next.js
├── tsconfig.json   # Configuración de TypeScript
└── package.json    # Dependencias y scripts
```

## ⚡ Funcionalidades

- 📊 **Visualización de datos de cashback** organizados por mes.
- 🚀 **Interfaz optimizada** con **Material UI**.
- 🔄 **Actualización eficiente de datos** usando React Query.
- 🎯 **Optimización de renders** con `React.memo` y `useMemo`.

## 🛠 Mejoras futuras

- 🔍 Implementar filtros dinámicos.
- 📈 Agregar gráficos interactivos.
- 🔗 Integrar con una API real.

---

📌 **Challenge completado por:** _Tu Nombre_  
📧 Contacto: [tu-email@example.com](mailto:tu-email@example.com)  
🚀 ¡Gracias por revisar este proyecto! 🎉

