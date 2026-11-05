# TaskFlow — Challenge 08

**Autora:** Natalia Paredes  
**Asignatura:** Desarrollo de Software para Plataformas Móviles  
**Tecnologías:** Ionic 9, React 19, TypeScript, Capacitor 8 y Supabase

Aplicación de gestión de tareas con registro e inicio de sesión, CRUD privado por usuario, lista en tiempo real y fotografía de perfil capturada con la cámara del teléfono y almacenada en Supabase Storage.

## Funcionalidades

- Registro, inicio de sesión, persistencia de la sesión y cierre de sesión con Supabase Auth.
- Crear, listar, editar, completar y eliminar tareas guardadas en PostgreSQL.
- Lista sincronizada por Supabase Realtime, con recarga ante cambios remotos.
- Políticas RLS para restringir las tareas al usuario autenticado.
- Capturar una fotografía con Capacitor Camera y subirla al bucket **privado** `avatars`, dentro de la carpeta del usuario.
- Interfaz de componentes Ionic adaptada a móvil.

## Requisitos

- Node.js compatible con la plantilla del proyecto, npm e Ionic CLI (`npm install -g @ionic/cli`).
- Cuenta y proyecto en Supabase; acceso a SQL Editor.
- Para pruebas nativas: Android Studio, Android SDK y un teléfono Android o emulador.

## Instalación

```powershell
git clone https://github.com/nataliap2005/natalia-paredes-react-challenges.git
cd natalia-paredes-react-challenges
git switch challenge-08
cd taskflow
npm install --legacy-peer-deps
```

Crea `.env` a partir de `.env.example` con **Project URL** y **publishable key** desde Supabase. No uses la secret key ni `service_role` en la aplicación.

```dotenv
VITE_SUPABASE_URL=https://TU_PROJECT_REF.supabase.co
VITE_SUPABASE_KEY=sb_publishable_TU_CLAVE
```

En Supabase, abre **SQL Editor** y ejecuta el script [`supabase/schema.sql`](supabase/schema.sql). Crea la tabla, habilita RLS, configura Realtime y crea el bucket `avatars` con las políticas necesarias. Si habilitas confirmación por email, configura la Site URL en Authentication → URL Configuration para tu entorno de desarrollo; confirma el correo antes del login.

```powershell
ionic serve
```

## Probar las funcionalidades

1. Crea una cuenta, confirma el correo si corresponde e inicia sesión.
2. Agrega tareas; cambia su título, márcalas como completadas y elimínalas.
3. Abre una segunda sesión con la misma cuenta para comprobar las actualizaciones en tiempo real.
4. En Perfil, captura una foto y comprueba en Supabase Storage → `avatars` que existe en `UID/avatar.jpg`.
5. Prueba con otra cuenta: no debe poder ver ni modificar las tareas de la primera.

## Ejecutar en Android

Capacitor ya está instalado como dependencia. Cuando tengas la aplicación funcionando en navegador:

```powershell
npm install @capacitor/android@8 --legacy-peer-deps
npm run build
npx cap add android
npx cap sync android
npx cap open android
```

Si `android/` ya existe, **omite** `npx cap add android`. Selecciona tu teléfono en Android Studio y pulsa Run. Cada vez que modifiques el frontend ejecuta `npm run build` y `npx cap sync android` antes de reinstalar.

La fotografía usa Capacitor Camera, que solicita acceso a la cámara al utilizarla. La captura nativa se debe verificar en el teléfono.

## Seguridad

La publishable key y la URL no son credenciales administrativas: el control de acceso depende de Auth, RLS y las políticas de Storage. El archivo `.env` está excluido del repositorio. El bucket es privado y las fotos se consultan mediante URLs firmadas. No hay claves secretas en el frontend.

## Estructura

- `src/contexts/AuthContext.tsx`: sesión y métodos de autenticación.
- `src/hooks/useTasks.ts`: lista y suscripción Realtime.
- `src/hooks/useCamera.ts`: fotografía mediante Capacitor.
- `src/services/`: CRUD y subida de avatares.
- `src/pages/`: login, registro, tareas y perfil.
- `supabase/schema.sql`: tabla, RLS, realtime, bucket y políticas.
