# Parcial 1 - Desarrollo de Plataformas Móviles

Para esta primera React usando Vite y JavaScript.

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
```

# Ejercicio 2 - Ionic React


La segunda parte se desarrolló con Ionic React
Aplicación móvil en Ionic React para que un médico pueda consultar y gestionar sus visitas del día.

## Funcionalidades

- Login con componentes de Ionic.
- Validación de credenciales.
- Uso de `IonToast` cuando las credenciales son incorrectas.
- Sesión guardada en `localStorage`.
- Navegación mediante `IonTabs`.
- Tabs disponibles:
  - Visitas
  - Pacientes
  - Perfil
- Lista de visitas del día.
- Cada visita muestra:
  - Paciente
  - Hora
  - Estado
- Navegación al detalle de cada visita.
- Cambio de estado de la visita:
  - `pendiente`
  - `en_camino`
  - `finalizada`
- Los cambios de estado se guardan en `localStorage`.
- La aplicación no utiliza backend.

## Usuario de prueba

```text
Usuario: medico
Contraseña: 123
