# SensorLab — Challenge 07

Aplicación nueva Ionic React + TypeScript basada en **Clase 07 – Sensors**. Home contiene ocho accesos y cada API de Capacitor se prueba en su propia página con un hook personalizado.

## Módulos
- Geolocalización (`useGeolocation`): lectura y seguimiento GPS.
- Cámara (`useCamera`): cámara y galería.
- Movimiento (`useAccelerometer`): X/Y/Z y sacudidas.
- Dispositivo (`useDevice`): sistema y batería.
- Vibración (`useHaptics`): impactos y feedback.
- Sistema de archivos (`useFilesystem`): escribir, leer, listar, borrar.
- Notificaciones locales (`useLocalNotifications`): permisos y programación.
- Push (`usePushNotifications`): permisos, token y recepción **tras configurar FCM nativo**.

## Instalación
```powershell
npm install
npm run build
ionic serve
```

## Prueba en Android físico (USB-C)
1. Instalar Android Studio y SDK, y habilitar opciones de desarrollador y depuración USB en el teléfono Android.
2. Conectar el móvil por USB y aceptar la clave de depuración.
3. En el proyecto: `npm run build`; `npx cap add android` **solo si la carpeta android no existe**; `npx cap sync android`; `npx cap open android`.
4. En Android Studio seleccionar el teléfono y pulsar Run. Conceder permisos por funcionalidad y tomar capturas.
5. Si se cambia código web: repetir `npm run build` y `npx cap sync android` antes de ejecutar la nueva versión.

## Notificaciones push — requisito adicional
Las APIs de push requieren Android físico o entorno nativo compatible, configurar Firebase Cloud Messaging, registrar la app Android con el `applicationId` de Capacitor, incluir el archivo `google-services.json` en `android/app`, y habilitar la integración de Google Services según las instrucciones vigentes de Capacitor/Firebase. **No basta con instalar el plugin**. No subir archivos secretos de servicios o tokens de dispositivos al repositorio.

## Evidencias
Guardar las capturas en `evidencias/`; documentar qué API se probó, dispositivo y resultado. El navegador no sustituye las pruebas de funciones nativas (notificaciones, vibración, sensores).
