# Cashback Dashboard

Este proyecto es parte de un challenge y consiste en un dashboard de cashback desarrollado con **React y Next.js**, utilizando **Material UI** para el diseño y **React Query** para la gestión de datos asíncronos.

## 🚀 Tecnologías utilizadas

- [Next.js](https://nextjs.org/) 
- [React](https://reactjs.org/) 
- [Material UI](https://mui.com/) 
- [React Query](https://tanstack.com/query/latest)
- [TypeScript](https://www.typescriptlang.org/) 


## Vista Previa 

![Captura desde 2025-03-13 14-57-15](https://github.com/user-attachments/assets/4228465b-1221-4040-8859-a91dd4112ed3)
![Captura desde 2025-03-13 14-57-08](https://github.com/user-attachments/assets/8d72bba0-16f4-4dff-9998-48e26f463025)
![Captura desde 2025-03-13 14-57-00](https://github.com/user-attachments/assets/e35fbd87-2f57-4123-b66f-fc39bab55adb)
![Captura desde 2025-03-13 14-56-54](https://github.com/user-attachments/assets/bd37adf4-1f30-4d34-902f-1c8ba1e8b31e)
![Captura desde 2025-03-13 14-56-48](https://github.com/user-attachments/assets/0305949d-69b4-44de-b2a4-695757a93554)

![Captura desde 2025-03-13 19-15-14](https://github.com/user-attachments/assets/46278572-60c5-4179-ab54-ee1c653c8f36)
![Captura desde 2025-03-13 19-15-05](https://github.com/user-attachments/assets/dba2094d-76ef-4314-8cd8-7a75195f7261)
![Captura desde 2025-03-13 19-15-01](https://github.com/user-attachments/assets/ab96f2db-66e7-434c-88e6-5c4aa0a955d9)



## 📦 Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/verocampero/puntospoint.git
   cd challenge-puntospoint
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

# Documentación con TypeDoc

Este proyecto utiliza [TypeDoc](https://typedoc.org/) para generar documentación a partir del código TypeScript.

## Instalación

Asegúrate de tener Node.js instalado en tu sistema. Luego, instala TypeDoc como una dependencia de desarrollo:

```sh
npm install --save-dev typedoc
```

## Generar la Documentación

Para generar la documentación, ejecuta el siguiente comando en la terminal:

```sh
npx typedoc
```

Esto generará una carpeta `docs/` con los archivos HTML de la documentación.

## Configuración Opcional

Puedes personalizar la generación de la documentación agregando un archivo `typedoc.json` en la raíz del proyecto:

```json
{
  "entryPoints": ["src/index.ts"],
  "out": "docs",
  "includeVersion": true
}
```

## Ver la Documentación

Una vez generada, puedes abrir el archivo `docs/index.html` en tu navegador para ver la documentación.

## Limpieza de Documentación Anterior

Si deseas eliminar la documentación generada previamente antes de regenerarla, puedes usar:

```sh
rm -rf docs && npx typedoc
```

---

Para más información, consulta la [documentación oficial de TypeDoc](https://typedoc.org/).



El servidor estará disponible en `http://localhost:3000`.


📌 **Challenge completado por:** _Veronica Campero_  
📧 Contacto: [verocampero2@gmail.com](mailto:tu-email@example.com)  
🚀 ¡Gracias por revisar este proyecto! 🎉

