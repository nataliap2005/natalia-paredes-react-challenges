# Challenge 02 - Gestor de Contactos (PWA)

Este challenge parte del código del **Challenge 01** (app de contactos en React) y lo transforma en una **Progressive Web App (PWA)**, siguiendo los 5 pasos vistos en la Clase 02: crear el manifest, conectarlo al `index.html`, crear el service worker, registrarlo en `main.jsx` y publicar en HTTPS.

## ¿Qué hace la app?

- Muestra un loader mientras se simula la carga de los contactos iniciales.
- Permite agregar un contacto con nombre y teléfono.
- Permite eliminar un contacto de la lista.
- La información se maneja en memoria con `useState` (no persiste al recargar).
- Puede instalarse en el celular o el computador como una app nativa (PWA).
- Funciona parcialmente offline gracias al Service Worker.

## Cambios respecto al Challenge 01

- Se agregó una imagen (ícono) al componente padre `App.jsx`.
- Se agregó el `manifest.json` (nombre, ícono, color de tema, modo de apertura).
- Se conectó el manifest en `index.html`.
- Se creó el `service-worker.js` en la carpeta `public`, usando una **estrategia híbrida**:

| Recurso | Estrategia | Por qué |
| --- | --- | --- |
| HTML | Network First | Para evitar versiones desactualizadas |
| JS / CSS | Cache First | Por el hash en el nombre del archivo |
| Imágenes | Cache First - Stale While Revalidate | Rendimiento |
| APIs | Network First | Datos actualizados |

- Se registró el Service Worker en `main.jsx`.
- Se desplegó la app en Netlify (HTTPS), requisito para que el Service Worker y la instalación funcionen.

## Estructura del proyecto

```
public/
├── manifest.json
├── service-worker.js
├── icon-192.png
├── icon-512.png

src/
├── App.jsx          # Componente principal, maneja el estado global
├── App.css          # Estilos de la app
├── Loader.jsx        # Simula la carga inicial con useEffect + setTimeout
├── ContactForm.jsx   # Formulario para agregar contactos
├── ContactList.jsx   # Recorre y renderiza la lista de contactos
├── ContactItem.jsx   # Representa un contacto individual
├── main.jsx          # Punto de entrada, registra el Service Worker
```

## Cómo correr el proyecto localmente

```bash
npm install
npm run dev
```

## Demo desplegada

🔗 [https://curious-scone-7b1213.netlify.app/](https://curious-scone-7b1213.netlify.app/)

## Cómo instalar la app en el celular

**Android (Chrome):**
1. Abre el link de la demo en Chrome.
2. Toca el menú (⋮) en la esquina superior derecha.
3. Selecciona **"Instalar app"** o **"Agregar a pantalla de inicio"**.
4. Confirma la instalación. El ícono de la app aparecerá en tu pantalla de inicio.

**iPhone (Safari):**
1. Abre el link de la demo en Safari.
2. Toca el botón de **compartir** (el cuadro con la flecha hacia arriba).
3. Selecciona **"Agregar a pantalla de inicio"**.
4. Confirma. El ícono aparecerá en tu pantalla de inicio como una app nativa.

## Tecnologías

- React
- Vite
- Service Workers / Web App Manifest (PWA)
- Netlify (deploy)