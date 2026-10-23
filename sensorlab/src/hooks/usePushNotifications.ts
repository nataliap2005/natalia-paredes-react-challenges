
import { useEffect, useRef, useState } from 'react';
import { Capacitor, type PluginListenerHandle } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

export function usePushNotifications() {
  const [permission, setPermission] = useState('sin consultar');
  const [token, setToken] = useState('');
  const [received, setReceived] = useState('');
  const [error, setError] = useState('');

  const listenersReady = useRef<Promise<void>>(Promise.resolve());

  // Prepara los eventos de registro y recepción de notificaciones.
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    let active = true;
    const listeners: PluginListenerHandle[] = [];

    listenersReady.current = (async () => {
      listeners.push(
        await PushNotifications.addListener('registration', result => {
          if (active) {
            setToken(result.value);
            setError('');
            console.log('FCM registrado correctamente');
          }
        })
      );

      listeners.push(
        await PushNotifications.addListener('registrationError', result => {
          if (active) {
            setError(JSON.stringify(result.error));
          }
        })
      );

      listeners.push(
        await PushNotifications.addListener('pushNotificationReceived', notification => {
          if (active) {
            setReceived(
              `${notification.title ?? 'Notificación'}: ${notification.body ?? ''}`
            );
          }
        })
      );

      listeners.push(
        await PushNotifications.addListener(
          'pushNotificationActionPerformed',
          action => {
            if (active) {
              setReceived(
                `Abierta: ${action.notification.title ?? 'Notificación'}`
              );
            }
          }
        )
      );
    })();

    listenersReady.current.catch(e => {
      if (active) setError(String(e));
    });

    return () => {
      active = false;
      void listenersReady.current.finally(() => {
        listeners.forEach(listener => void listener.remove());
      });
    };
  }, []);

  // Solicita permisos y registra el teléfono cuando los listeners estén listos.
  const register = async () => {
    if (!Capacitor.isNativePlatform()) {
      setError('Las notificaciones push requieren Android o iOS.');
      return;
    }

    try {
      setError('');

      await listenersReady.current;

      const result = await PushNotifications.requestPermissions();
      setPermission(result.receive);

      if (result.receive !== 'granted') {
        setError('No se concedió permiso para recibir notificaciones.');
        return;
      }

      await PushNotifications.register();
    } catch (e) {
      setError(String(e));
    }
  };

  return { permission, token, received, error, register };
}
