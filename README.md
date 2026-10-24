<div align="center">

# TheMissionApp

### Parcial 2 · Desarrollo de Software para Plataformas Móviles

**Natalia Paredes** · Rama de entrega: `parcial-2-natalia-paredes`

</div>

---

## Video de demostración

### ▶️ **[Ver video de demostración (parcial 2.mp4)](./parcial2.mp4)**

Grabado en un dispositivo Android físico. Muestra el registro e inicio de sesión, la evidencia fotográfica, el desplazamiento con GPS, los diez segundos de permanencia con vibración, las notificaciones locales, los puntos, los resultados y el ranking.

---

## Descripción

TheMissionApp es una aplicación móvil de misiones interactivas desarrollada con **Ionic React, TypeScript, Capacitor y Firebase**. Los usuarios autenticados completan retos que usan sensores reales de Android, acumulan puntos y consultan su progreso y un ranking.

Plantea tres misiones: registrar una evidencia fotográfica con la cámara, desplazarse usando GPS y permanecer quieto durante diez segundos para activar una vibración. Los puntos se guardan en Firebase y se reflejan en la barra de progreso, los resultados y el ranking.

## Funcionalidades

| Funcionalidad | Descripción | Puntos |
| --- | --- | ---: |
| **Misión 1 · Evidencia fotográfica** | Captura una imagen con la cámara y la guarda con Capacitor Filesystem. | 40 |
| **Misión 2 · Movimiento real** | Registra una posición inicial con GPS y calcula la distancia hasta la posición actual. Se completa al superar **30 metros** desde el punto inicial. | 40 |
| **Misión 3 · Permanencia activa** | Se desbloquea al completar la misión de movimiento. Con el acelerómetro verifica que el dispositivo permanezca quieto **10 segundos** y activa una vibración. | 40 |
| **Progreso** | Muestra misiones pendientes y completadas, puntos y porcentaje de avance. | — |
| **Resultados** | Presenta el estado general, los puntos totales y las misiones completadas. | — |
| **Ranking** | Consulta los cinco usuarios con mayor puntaje almacenado en Firestore. | — |
| **Notificaciones locales** | Avisan al completar una misión y cuando solo falta una por terminar. | — |

**Puntaje máximo:** 120 puntos (3 misiones × 40). Cada misión se acredita una sola vez por usuario.

## Tecnologías

- **Ionic React 9 + React 19 + TypeScript:** interfaz y navegación.
- **Capacitor 8:** ejecución nativa en Android y acceso a sensores.
- **Firebase Authentication:** registro, inicio y cierre de sesión con correo y contraseña.
- **Cloud Firestore:** progreso, puntos y ranking por usuario.
- **`localStorage`:** copia local del progreso para recuperar el último estado durante la carga.
- **Plugins de Capacitor:** Camera, Geolocation, Motion, Haptics, Filesystem y Local Notifications.
- **Vite:** entorno de desarrollo y compilación.

## Estructura del proyecto

```text
themissionapp/
├── android/                         # Proyecto Android para Capacitor
├── public/
├── src/
│   ├── components/                  # Tarjetas, progreso, rutas protegidas y layout
│   ├── contexts/
│   │   ├── AuthContext.tsx           # Sesión del usuario
│   │   └── MissionsContext.tsx       # Estado de las misiones y puntos
│   ├── hooks/
│   │   ├── useCameraMission.ts       # Captura y guardado de fotografías
│   │   ├── useGeolocationMission.ts  # GPS y cálculo de distancia
│   │   ├── useStillnessMission.ts    # Acelerómetro y vibración
│   │   └── useLocalNotifications.ts  # Avisos locales
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Home.tsx
│   │   ├── PhotoMission.tsx
│   │   ├── MovementMission.tsx
│   │   ├── StillnessMission.tsx
│   │   ├── Results.tsx
│   │   └── Ranking.tsx
│   ├── services/                     # Operaciones con Firebase y Firestore
│   ├── types/                        # Modelos de misiones y progreso
│   ├── theme/                        # Estilos de Ionic y de la aplicación
│   ├── firebase.ts                   # Inicialización del SDK web de Firebase
│   ├── App.tsx
│   └── main.tsx
├── parcial 2.mp4                     # Video de la aplicación en Android
├── .env.example                      # Plantilla de configuración
├── firestore.rules                   # Reglas de seguridad de Firestore
├── capacitor.config.ts
├── package.json
└── README.md
```

## Requisitos

Para ejecutar en el navegador:

- **Node.js** 20.19+ o 22.12+ y npm.
- **Ionic CLI** (`npm install -g @ionic/cli`) o los scripts de npm.
- Un proyecto de **Firebase** con Authentication y Cloud Firestore habilitados.

Para instalar y probar en Android:

- **Android Studio** con el Android SDK configurado.
- Teléfono Android con ubicación, cámara y acelerómetro, y **Depuración USB** activada (Opciones de desarrollador).
- Cable USB y conexión a internet.

## Instalación

```bash
git clone https://github.com/USUARIO/natalia-paredes-react-challenges.git
cd natalia-paredes-react-challenges
git switch parcial-2-natalia-paredes
cd themissionapp
npm install
```

Reemplaza `USUARIO` por el propietario del repositorio en GitHub.

### 1. Configurar Firebase

En **Firebase Console → Configuración del proyecto → Tus apps**, registra o selecciona una aplicación web y copia la configuración del SDK. Crea un archivo `.env` en la raíz de `themissionapp` a partir de `.env.example`:

```dotenv
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=TU_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
```

Luego, en Firebase:

1. Habilita **Authentication → Sign-in method → Correo electrónico/contraseña**.
2. Crea la base de datos en **Firestore Database**.
3. En **Firestore Database → Reglas**, publica las reglas de `mission_users` y `mission_progress` incluidas en `firestore.rules`. Si el proyecto tiene reglas de otras colecciones, consérvalas.

El archivo `.env` real no debe subirse al repositorio.

### 2. Ejecutar en el navegador

```bash
ionic serve
```

También funciona `npm run dev`. El navegador sirve para probar la interfaz, la autenticación, Firestore, los resultados y el ranking; los sensores se prueban en el teléfono.

### 3. Compilar e instalar en Android

Desde la carpeta `themissionapp`:

```bash
npm run build
npx cap sync android
npx cap open android
```

En Android Studio, conecta el dispositivo por USB, selecciónalo y pulsa **Run**. Cada vez que cambies código de React o TypeScript, repite `npm run build` y `npx cap sync android` antes de volver a instalar.

### 4. Permisos de Android

`android/app/src/main/AndroidManifest.xml` declara:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

Los permisos de ubicación y notificaciones también se solicitan en tiempo de ejecución. Para la misión de GPS, activa la ubicación precisa y mantén la aplicación abierta mientras te desplazas.

## Persistencia y ranking

La aplicación usa dos colecciones de Cloud Firestore:

```text
mission_users/{uid}
  displayName
  email
  points
  updatedAt

mission_progress/{uid}
  points
  missions:
    photo: boolean
    movement: boolean
    stillness: boolean
  updatedAt
```

- `mission_users` guarda el perfil y el puntaje que consulta el ranking.
- `mission_progress` guarda el estado de cada misión.
- `localStorage` conserva una copia del progreso asociada al usuario.
- Los puntos se actualizan con transacciones, para no acreditar dos veces la misma misión.
- La foto se guarda **localmente en el dispositivo**, no en Firestore ni en Firebase Storage.

El ranking muestra hasta **cinco usuarios reales**; para ver cinco puestos deben existir cinco cuentas con perfil en `mission_users`.

---

<div align="center">

**Desarrollado por Natalia Paredes**
*Parcial 2 · Desarrollo de Software para Plataformas Móviles*

</div>
