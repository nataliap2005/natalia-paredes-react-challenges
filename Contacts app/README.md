# Challenge 04 - Contacts App

Aplicación desarrollada en **React + JavaScript + Vite**, basada en la aplicación de contactos del Challenge 01.

En este Challenge se agregó un sistema de autenticación básico usando `localStorage`, navegación entre páginas con `react-router-dom` y cierre de sesión.

---

## Funcionalidades

La aplicación permite:

- Iniciar sesión con credenciales predefinidas.
- Validar correo electrónico y contraseña.
- Guardar el estado de sesión usando `localStorage`.
- Mantener la sesión iniciada aunque se recargue la página.
- Redirigir automáticamente a la lista de contactos si el usuario ya inició sesión.
- Cerrar sesión y eliminar el token almacenado.
- Listar contactos.
- Agregar nuevos contactos.
- Eliminar contactos.
- Mostrar un loader al cargar los contactos iniciales.

---

## Credenciales de acceso

Para iniciar sesión se deben utilizar las siguientes credenciales:

```text
Email: user@mail.com
Password: 123