# Parcial 1 - Desarrollo de Plataformas Móviles

vite, react javascript

## Ejercicio 1 - PWA React

Aplicación web para la administración de pacientes de MediClinic.

## Funcionalidades

- Login con usuario fijo.
- Validación de credenciales.
- Sesión guardada en `localStorage`.
- Recuperación de la sesión al recargar la página.
- Cierre de sesión.
- Formulario para agregar pacientes.
- Campos:
  - Nombre
  - Apellido
  - CC
  - Teléfono
- Validación de nombre, apellido y CC.
- Lista de pacientes registrados.
- Pacientes guardados en `localStorage`.
- Búsqueda por nombre, apellido o CC.
- La búsqueda se maneja desde el componente padre y la lista filtrada se envía al componente hijo.
- Conversión de la aplicación a PWA mediante:
  - `manifest.json`
  - `service-worker.js`
  - Iconos de la aplicación.

## Usuario de prueba

```text
Usuario: admin
Contraseña: 123

