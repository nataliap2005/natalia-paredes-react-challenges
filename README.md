# Challenge 01 - Gestor de Contactos

App de contactos en React que permite listar, agregar y eliminar contactos simulando una carga inicial de datos.

## ¿Qué hace la app?

- Muestra un loader mientras se simula la carga de los contactos iniciales.
- Permite agregar un contacto con nombre y teléfono.
- Permite eliminar un contacto de la lista.
- La información se maneja en memoria con `useState` (no persiste al recargar).

## Estructura del proyecto

```
src/
├── App.jsx          # Componente principal, maneja el estado global
├── Loader.jsx        # Simula la carga inicial con useEffect + setTimeout
├── ContactForm.jsx   # Formulario para agregar contactos
├── ContactList.jsx   # Recorre y renderiza la lista de contactos
├── ContactItem.jsx   # Representa un contacto individual
```

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

## Tecnologías

- React
- Vite