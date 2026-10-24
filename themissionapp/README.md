# TheMissionApp — Parcial 2

**Autora:** Natalia Paredes  
**Rama:** `parcial-2-natalia-paredes`  
**Tecnologías:** Ionic React, TypeScript, Capacitor 8, Firebase Authentication, Cloud Firestore y almacenamiento local.

Aplicación móvil de tres misiones con acciones reales: evidencia fotográfica, recorrido GPS de 50 metros y permanencia quieta de 10 segundos con vibración. Cada misión otorga 40 puntos, hasta un máximo de 120.

## Requisitos

- Node.js compatible con Vite 8 (recomendado Node 22.12+), npm e Ionic CLI.
- Android Studio, Android SDK y teléfono Android con depuración USB para sensores nativos.
- Proyecto Firebase con **Email/Password Authentication** y **Cloud Firestore**.
- Permisos de cámara, ubicación y notificaciones en Android.

## Clonar y ejecutar

```bash
git clone https://github.com/TU_USUARIO/natalia-paredes-react-challenges.git
cd natalia-paredes-react-challenges
git switch parcial-2-natalia-paredes
cd themissionapp
npm install
cp .env.example .env
npm run dev
```

En PowerShell usa `Copy-Item .env.example .env` en lugar de `cp` si es necesario. Completa `.env` con la configuración de **tu aplicación web Firebase** (Firebase Console → Configuración del proyecto → Agregar aplicación web). La clave API web es pública; nunca coloques claves administrativas privadas en `.env` del frontend.

## Configuración de Firebase

1. Abre Firebase Console y crea o reutiliza un proyecto.
2. En Authentication → Sign-in method activa **Correo electrónico/contraseña**.
3. En Firestore Database crea la base de datos.
4. En la pestaña **Reglas**, pega el contenido de `firestore.rules` y publícalo. Es necesario para el ranking y para evitar que usuarios lean el progreso privado de otras cuentas.
5. Crea varias cuentas reales desde la app para mostrar hasta cinco participantes en el ranking. No se generan cuentas ficticias.

> Importante: las reglas validan la estructura y evitan retrocesos del progreso, pero una app cliente no puede demostrar por sí sola que alguien caminó o permaneció quieto. Para proteger un ranking competitivo contra fraude se necesita validación en backend de confianza (p. ej., Cloud Functions). Para el parcial, se implementan sensores reales y persistencia con transacciones.

## Ejecutar en Android

```bash
npm run build
npx cap sync android
npx cap open android
```

Conecta tu Samsung con depuración USB, selecciona el dispositivo en Android Studio y pulsa **Run**. En el proyecto se agregaron los permisos `ACCESS_COARSE_LOCATION`, `ACCESS_FINE_LOCATION` y `POST_NOTIFICATIONS` al archivo `android/app/src/main/AndroidManifest.xml`.

Las misiones de GPS, vibración y acelerómetro deben verificarse en Android real. En navegador, algunas APIs pueden estar limitadas o no disponibles. Para el GPS, inicia la prueba al aire libre, espera precisión razonable y mantén la app abierta mientras caminas.

## Funcionalidades

| Pantalla | Características |
| --- | --- |
| Registro/Login | Firebase Authentication y sesión persistente |
| Inicio | Tres misiones, estados, puntos y progreso |
| Evidencia | Captura de foto y guardado mediante Capacitor Filesystem |
| Movimiento | Seguimiento GPS con distancia Haversine desde origen; 50 m para completar |
| Permanencia | Acelerómetro: 10 s estables y vibración con Haptics |
| Resultados | Total de puntos, 3 misiones y porcentaje completado |
| Ranking | Cinco cuentas reales con mayor puntaje en Firestore |
| Avisos | Notificaciones locales al completar misiones y cuando falta una |

**Persistencia:** el progreso se guarda en `mission_progress/{uid}` y el puntaje público en `mission_users/{uid}`; se mantiene una copia del progreso en `localStorage` para mostrar el último estado mientras carga Firestore. La foto se guarda **solo en el almacenamiento local de la instalación** para no exponerla a otros usuarios.

**Distancias del enunciado:** aunque una sección menciona `>30 m`, la pantalla principal y el desbloqueo de la misión 3 especifican 50 m. Se usa **50 m**, el umbral más exigente.

## Estructura

- `src/pages`: pantallas de autenticación, misiones, resultados y ranking.
- `src/hooks`: cámara, ubicación, quietud y avisos locales.
- `src/contexts`: autenticación y progreso.
- `src/services`: lógica de autenticación, Firestore y ranking.
- `src/components`: tarjetas, resumen y protección de rutas.
- `firestore.rules`: reglas que deben publicarse en Firebase Console.

## Evidencia

Video demostrativo: **[Añadir enlace de YouTube]**.

## Seguridad

- `.env` está excluido de Git. Solo publica `.env.example`.
- Nunca publiques tokens, contraseñas de usuarios o llaves `serviceAccount`.
- La lista del ranking muestra el nombre y los puntos, sin exponer el correo en la interfaz.
