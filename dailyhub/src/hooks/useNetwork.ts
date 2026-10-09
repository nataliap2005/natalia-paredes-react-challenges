import { useEffect, useState } from 'react';
import { Network } from '@capacitor/network';

// El navegador puede indicar "online" aunque no tenga acceso a Internet.
// Por eso comprobamos también la disponibilidad real del servidor de Firebase.
let online = false;
let subscribers = new Set<(value: boolean) => void>();
let timer: ReturnType<typeof setInterval> | undefined;
let sequence = 0;

function publish(value: boolean) {
  if (online === value) return;
  online = value;
  subscribers.forEach(listener => listener(value));
}

async function checkConnection(): Promise<boolean> {
  const checkId = ++sequence;

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    publish(false);
    return false;
  }

  try {
    const status = await Network.getStatus();
    if (!status.connected) {
      if (checkId === sequence) publish(false);
      return false;
    }

    const baseUrl = import.meta.env.VITE_FIREBASE_DATABASE_URL?.replace(/\/$/, '');
    if (!baseUrl) {
      if (checkId === sequence) publish(false);
      return false;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);
    try {
      // Una respuesta 401/403 también demuestra que Firebase es accesible.
      // El acceso a los datos sigue protegido por las reglas de seguridad.
      const response = await fetch(
        `${baseUrl}/__dailyhub_connectivity__.json?t=${Date.now()}`,
        { method: 'GET', cache: 'no-store', signal: controller.signal }
      );
      const connected = response.status >= 200 && response.status < 500 && navigator.onLine;
      if (checkId === sequence) publish(connected);
      return connected;
    } finally {
      clearTimeout(timeout);
    }
  } catch {
    if (checkId === sequence) publish(false);
    return false;
  }
}

function offline() {
  ++sequence;
  publish(false);
}

function subscribe(listener: (value: boolean) => void) {
  subscribers.add(listener);
  listener(online);

  if (subscribers.size === 1) {
    void checkConnection();
    // Una comprobación periódica permite detectar desconexiones del Wi-Fi
    // que el navegador no notifique mediante el evento "offline".
    timer = setInterval(() => { void checkConnection(); }, 3000);
    window.addEventListener('online', refresh);
    window.addEventListener('offline', offline);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
  }

  return () => {
    subscribers.delete(listener);
    if (subscribers.size === 0) {
      if (timer) clearInterval(timer);
      timer = undefined;
      window.removeEventListener('online', refresh);
      window.removeEventListener('offline', offline);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    }
  };
}

function refresh() {
  if (document.visibilityState !== 'hidden') void checkConnection();
}

export async function requireOnline(): Promise<void> {
  // Nunca enviamos una escritura a Firebase sin comprobar la conexión.
  if (!(await checkConnection())) {
    throw new Error('Sin conexión a Firebase. Contactos y Tareas están deshabilitados.');
  }
}

export function useNetwork() {
  const [isOnline, setIsOnline] = useState(online);
  useEffect(() => subscribe(setIsOnline), []);
  return { isOnline };
}
