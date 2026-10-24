
import { useEffect, useRef, useState } from 'react';
import { Geolocation, type Position } from '@capacitor/geolocation';

const REQUIRED_METERS = 50;
const RADIUS_METERS = 6371000;

// Calcula la distancia entre la posición inicial y la actual.
function distanceMeters(a: Position, b: Position): number {
  const radians = Math.PI / 180;

  const lat = (b.coords.latitude - a.coords.latitude) * radians;
  const lon = (b.coords.longitude - a.coords.longitude) * radians;

  const h =
    Math.sin(lat / 2) ** 2 +
    Math.cos(a.coords.latitude * radians) *
      Math.cos(b.coords.latitude * radians) *
      Math.sin(lon / 2) ** 2;

  return (
    2 *
    RADIUS_METERS *
    Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
  );
}

export function useGeolocationMission() {
  const watcher = useRef<string | null>(null);
  const origin = useRef<Position | null>(null);
  const active = useRef(false);
  const achieved = useRef(false);

  const [meters, setMeters] = useState(0);
  const [accuracy, setAccuracy] = useState<number | null>(null);
  const [tracking, setTracking] = useState(false);
  const [waitingForFix, setWaitingForFix] = useState(false);
  const [error, setError] = useState('');
  const [reached, setReached] = useState(false);

  async function stop() {
    active.current = false;

    const id = watcher.current;
    watcher.current = null;

    if (id) {
      try {
        await Geolocation.clearWatch({ id });
      } catch {
        // El seguimiento ya estaba detenido.
      }
    }

    setTracking(false);
    setWaitingForFix(false);
  }

  async function start() {
    if (active.current) return;

    active.current = true;
    origin.current = null;
    achieved.current = false;

    setMeters(0);
    setAccuracy(null);
    setReached(false);
    setError('');
    setWaitingForFix(true);

    try {
      const permission = await Geolocation.requestPermissions();

      if (
        permission.location !== 'granted' &&
        permission.coarseLocation !== 'granted'
      ) {
        throw new Error('Debes permitir el acceso a la ubicación.');
      }

      if (!active.current) return;

      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 60000,
          maximumAge: 0
        },
        (position, gpsError) => {
          if (!active.current || achieved.current) return;

          if (gpsError) {
            setError(`Esperando GPS: ${gpsError.message}`);
            return;
          }

          if (!position) return;

          setError('');
          setAccuracy(position.coords.accuracy);

          // Primera lectura: guardar el punto de inicio.
          if (!origin.current) {
            origin.current = position;
            setWaitingForFix(false);
            return;
          }

          // Calcular los metros desde la ubicación inicial.
          const traveled = distanceMeters(origin.current, position);

          setMeters(traveled);

          // Completar inmediatamente al superar los 30 metros.
          if (traveled > REQUIRED_METERS) {
            achieved.current = true;
            setReached(true);

            void stop();
          }
        }
      );

      if (!active.current) {
        await Geolocation.clearWatch({ id });
        return;
      }

      watcher.current = id;
      setTracking(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      await stop();
    }
  }

  useEffect(() => {
    return () => {
      active.current = false;

      if (watcher.current) {
        void Geolocation.clearWatch({
          id: watcher.current
        });
      }
    };
  }, []);

  return {
    start,
    stop,
    meters,
    accuracy,
    tracking,
    waitingForFix,
    reached,
    error
  };
}
