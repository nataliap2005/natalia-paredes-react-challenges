# SensorLab — Challenge 07 | Sensores y capacidades del dispositivo

**Desarrollado por:** Natalia Paredes  
**Asignatura:** Desarrollo de Aplicaciones Móviles  
**Proyecto:** Challenge 07 — SensorLab  
**Tecnologías:** Ionic React · TypeScript · Capacitor · Android · Firebase Cloud Messaging

---

## Descripción

**SensorLab** es una aplicación móvil desarrollada con **Ionic React y Capacitor** para explorar capacidades nativas de un teléfono Android mediante una interfaz sencilla. Desde una pantalla principal se puede ingresar a **ocho módulos independientes**: geolocalización, cámara, movimiento, información del dispositivo, vibración, almacenamiento de archivos, notificaciones locales y notificaciones push.

El proyecto permite ejecutar la interfaz en el navegador durante el desarrollo, pero **las pruebas de sensores, permisos y notificaciones se realizan preferiblemente en un dispositivo Android físico**. La integración de notificaciones remotas utiliza **Firebase Cloud Messaging (FCM)**.

## Demostración del funcionamiento

**Video demostrativo completo:** [Ver SensorLab funcionando en Android](https://youtube.com/shorts/IBNHox9aybw)

> **Evidencia única de funcionamiento:** el video muestra el recorrido por las ocho funcionalidades de SensorLab en un dispositivo Android.

## Tecnologías y dependencias

| Herramienta | Uso |
|---|---|
| **Ionic React 9** | Componentes visuales y navegación entre pantallas |
| **React 19 + TypeScript** | Interfaz, estado y lógica tipada |
| **Capacitor 8** | Comunicación con funciones nativas de Android |
| **Vite 8** | Servidor y compilación de la interfaz web |
| **React Router 6** | Rutas para cada módulo |
| **Firebase Cloud Messaging** | Envío y recepción de notificaciones remotas |
| **Android Studio + Android SDK** | Compilación e instalación de la app Android |

**Plugins principales:** `@capacitor/geolocation`, `@capacitor/camera`, `@capacitor/motion`, `@capacitor/device`, `@capacitor/haptics`, `@capacitor/filesystem`, `@capacitor/local-notifications` y `@capacitor/push-notifications`.

Las versiones y dependencias exactas se encuentran en [`package.json`](package.json) y `package-lock.json` del proyecto. **No es necesario instalar manualmente los plugins uno por uno después de clonar**, pues se instalan con las dependencias del proyecto.

## Requisitos previos

Para ejecutar la versión web:

- **Git**, para clonar el repositorio.
- **Node.js y npm**, en versiones compatibles con la versión de Vite declarada en `package.json` (se recomienda usar Node.js LTS actualizado; verificar compatibilidad antes de instalar).
- Un editor como **Visual Studio Code**.
- Navegador web moderno (Chrome, Edge, etc.).

Para ejecutar y probar sensores en Android:

- **Android Studio**, Android SDK y herramientas de compilación instaladas.
- **JDK** compatible con la versión del Android Gradle Plugin incluida en el proyecto.
- Teléfono Android con los sensores correspondientes, cable USB de datos y **depuración USB** habilitada; alternativamente, emulador para las funciones compatibles.
- Conexión a Internet para sincronización de dependencias y pruebas de FCM.
- Para push: acceso a un proyecto de **Firebase** con una app Android registrada.

> El proyecto fue probado en un dispositivo Samsung Android conectado por USB. Algunas APIs dependen del hardware y de los permisos otorgados por el usuario.

## Clonar e instalar el proyecto

El código forma parte del repositorio de retos:

```bash
git clone https://github.com/natalia-paredes/natalia-paredes-react-challenges.git
cd natalia-paredes-react-challenges
```

> **Importante:** la URL anterior es **solo un ejemplo de estructura** y no está verificada. Sustitúyela por la URL real de tu repositorio de GitHub antes de publicar. Si `sensorlab` está disponible en la rama `challenge-07`, cambia a esa rama:

```bash
git fetch origin
git switch challenge-07
cd sensorlab
npm ci
```

Si no existe un `package-lock.json` válido, utiliza `npm install` en lugar de `npm ci`.

### Ejecutar en navegador

```bash
npm run dev
```

Abre la dirección local que muestre Vite (habitualmente `http://localhost:5173`). También puedes iniciar con `npx ionic serve` si dispones de Ionic CLI.

**Limitación:** el navegador permite revisar navegación e interfaz, pero las capacidades nativas (sobre todo notificaciones push de Capacitor) requieren instalación en Android.

### Compilar e instalar en Android

Desde el directorio `sensorlab`:

```bash
npm run build
npx cap sync android
npx cap open android
```

1. En el teléfono, habilita las **opciones de desarrollador** y la **depuración USB**.
2. Conéctalo mediante un cable USB que permita transferir datos.
3. Acepta la autorización de depuración cuando Android la solicite.
4. En Android Studio, espera la sincronización de Gradle y selecciona el dispositivo.
5. Pulsa **Run ▶** para compilar e instalar SensorLab.

La plataforma Android ya está presente en el proyecto. No hace falta ejecutar `npx cap add android` otra vez si la carpeta `android/` se encuentra en el repositorio.

**Después de cambiar código React/TypeScript:** ejecutar `npm run build` y `npx cap sync android` antes de volver a pulsar **Run**.

**Después de modificar únicamente un archivo nativo de Android:** volver a compilar desde Android Studio; `npx cap sync android` puede ayudar a sincronizar plugins, pero no sustituye la compilación nativa.

## Configuración de permisos Android

Los permisos se declaran en `android/app/src/main/AndroidManifest.xml` según la funcionalidad y la versión de Android. Para geolocalización, comprobar que estén estas declaraciones **fuera de `<application>` y dentro de `<manifest>`**:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

Para Android 13 y superiores, las notificaciones necesitan autorización del usuario. Verificar la integración y los permisos pertinentes, incluido `POST_NOTIFICATIONS`, en el manifiesto de la aplicación o en el manifiesto combinado generado por Gradle. Las APIs de Capacitor también solicitan permisos en tiempo de ejecución.

> **Nota de revisión:** en el ZIP utilizado como referencia, el archivo fuente `AndroidManifest.xml` incluía `INTERNET` pero **no mostraba los permisos de ubicación**. Si al clonar aparece el error `Location permissions are not declared in manifest`, añade las dos líneas anteriores, recompila y vuelve a instalar.

## Configuración de Firebase Cloud Messaging

El módulo de notificaciones push necesita Firebase; sin él, el resto de SensorLab puede utilizarse normalmente.

1. Entrar a [Firebase Console](https://console.firebase.google.com/) y crear o seleccionar un proyecto.
2. Registrar una **aplicación Android** usando el identificador de paquete `io.ionic.starter`, tal como figura en `capacitor.config.ts` y `android/app/build.gradle` de esta versión.
3. Descargar **`google-services.json`** desde Firebase.
4. Colocar el archivo en `sensorlab/android/app/google-services.json`.
5. Comprobar que `android/build.gradle` incluya el plugin `com.google.gms:google-services` y que `android/app/build.gradle` lo aplique al existir el JSON. En el proyecto revisado ambas configuraciones ya estaban implementadas.
6. Ejecutar los comandos de compilación y sincronización e instalar nuevamente la app desde Android Studio.
7. En SensorLab → **Notificaciones push**, pulsar **Solicitar permiso y registrar**, conceder permiso y esperar la aparición del **token FCM**.
8. En Firebase Console → **Messaging**, crear un mensaje de notificación, usar **Enviar mensaje de prueba**, introducir el token vigente del dispositivo y realizar el envío.

**Consejo para la prueba:** copiar el token como una cadena continua, sin introducir espacios ni saltos de línea. En Chrome DevTools puede obtenerse desde el elemento mostrado por la interfaz con:

```javascript
copy(document.querySelector('.result span')?.textContent?.trim())
```

Es normal que la consola muestre `undefined` después de ejecutar `copy()`: significa que la función no devuelve un valor. En Android, una notificación enviada con la aplicación en segundo plano suele mostrarse en la barra del sistema; con la app abierta, el evento del plugin puede actualizar el campo **Última notificación**.

**Seguridad:** no publicar tokens FCM, claves privadas ni credenciales de servicio. El archivo `google-services.json` es una configuración cliente y **no sustituye la protección de los recursos de Firebase**; conviene distribuirlo de acuerdo con las políticas del equipo o institución.

## Funcionalidades implementadas

### 1. Geolocalización

- **Obtener ubicación:** usa `Geolocation.getCurrentPosition()` para consultar latitud, longitud, precisión y altitud (cuando esté disponible).
- **Iniciar seguimiento:** utiliza `Geolocation.watchPosition()` para actualizar la posición mientras haya seguimiento activo.
- **Detener:** cancela la suscripción mediante `Geolocation.clearWatch()`.
- Requiere permiso de ubicación y que el servicio de ubicación del teléfono esté activado.

### 2. Cámara y galería

- **Tomar foto:** abre la cámara del dispositivo.
- **Abrir galería:** permite seleccionar una imagen almacenada.
- Muestra la fotografía resultante en una vista previa.
- Implementado con `Camera.getPhoto()`.

### 3. Movimiento y acelerómetro

- **Iniciar / Detener** lectura del acelerómetro con el evento `Motion.addListener('accel', ...)`.
- Visualiza componentes **X, Y, Z** y magnitud de aceleración.
- Detecta una posible **sacudida** cuando la magnitud supera el umbral definido en el código (`18`).
- La detección es demostrativa y no equivale a una calibración física del sensor.

### 4. Información del dispositivo

- Consulta plataforma, modelo, fabricante, sistema operativo y versión.
- Presenta nivel de batería, estado de carga y un identificador proporcionado por el plugin.
- Utiliza `@capacitor/device`.

### 5. Vibración y respuesta háptica

- Prueba **impacto suave**, **impacto fuerte**, patrones de **éxito** y **error** y **vibración de 500 ms**.
- Usa `@capacitor/haptics`.
- La respuesta exacta depende del hardware del teléfono.

### 6. Sistema de archivos

- Permite escribir, leer, listar y eliminar el archivo de ejemplo **`sensorlab-demo.txt`**.
- Edita el texto desde la pantalla y muestra el contenido leído y la lista de archivos.
- Emplea el directorio privado de datos de la app (`Directory.Data`) y codificación UTF-8.

### 7. Notificaciones locales

- Solicita permisos para mostrar notificaciones.
- Permite **enviar ahora** o **programar una notificación 5 segundos después**.
- Utiliza `@capacitor/local-notifications`; no requiere Firebase.

### 8. Notificaciones push con FCM

- Solicita permiso para recibir mensajes remotos.
- Registra la instalación en Firebase Cloud Messaging y presenta el **token de registro**.
- Atiende los eventos `registration`, `registrationError`, `pushNotificationReceived` y `pushNotificationActionPerformed`.
- Muestra la última notificación recibida o abierta durante la sesión.
- Requiere configuración de Firebase y conexión a Internet.

## Organización del código

```text
sensorlab/
├── android/                        # Proyecto Android nativo de Capacitor
├── public/                         # Recursos públicos
├── src/
│   ├── components/
│   │   └── SensorPage.tsx          # Estructura compartida de cada pantalla
│   ├── hooks/                      # Lógica de acceso a sensores y APIs
│   │   ├── useGeolocation.ts
│   │   ├── useCamera.ts
│   │   ├── useAccelerometer.ts
│   │   ├── useDevice.ts
│   │   ├── useHaptics.ts
│   │   ├── useFilesystem.ts
│   │   ├── useLocalNotifications.ts
│   │   └── usePushNotifications.ts
│   ├── pages/                      # Pantallas de las ocho funcionalidades
│   ├── theme/                      # Estilos de Ionic y de SensorLab
│   └── App.tsx                     # Configuración de rutas
├── capacitor.config.ts             # Configuración de Capacitor
├── package.json                    # Scripts y dependencias
└── README.md
```

La pantalla principal (`src/pages/Home.tsx`) ofrece el acceso a los ocho módulos, mientras que los **hooks** separan la lógica de los sensores de los componentes de la interfaz.

##  Problemas habituales y solución

| Situación | Qué revisar |
|---|---|
| La app abre pero no muestra el contenido | Confirmar que `src/App.tsx` importe los CSS esenciales de Ionic y que se haya generado/sincronizado el build actualizado. |
| Error por permisos de geolocalización | Declarar `ACCESS_COARSE_LOCATION` y `ACCESS_FINE_LOCATION` en `AndroidManifest.xml` y reinstalar. |
| Una API no funciona en navegador | Probar en Android físico; algunos plugins requieren plataforma nativa. |
| No aparece token push | Revisar permisos, `google-services.json`, paquete Android y conexión; consultar Logcat. |
| Hay token FCM, pero no llega la prueba | Copiar exactamente el token vigente, verificar el proyecto Firebase y probar con la app en segundo plano. |
| Android no refleja cambios de React | Ejecutar `npm run build`, `npx cap sync android` y volver a ejecutar la app. |

##  Referencias

- [Ionic React](https://ionicframework.com/docs/react)
- [Capacitor](https://capacitorjs.com/docs)
- [Capacitor Geolocation](https://capacitorjs.com/docs/apis/geolocation)
- [Capacitor Push Notifications](https://capacitorjs.com/docs/apis/push-notifications)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)

---

**Autora:** Natalia Paredes  
**Challenge 07 — Desarrollo de Aplicaciones Móviles**
