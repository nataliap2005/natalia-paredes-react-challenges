
import { useEffect, useRef, useState } from 'react';
import {
  IonButton,
  IonProgressBar,
  IonText,
  IonBadge,
  IonSpinner
} from '@ionic/react';

import PageShell from '../components/PageShell';
import { useMissions } from '../contexts/MissionsContext';
import { useGeolocationMission } from '../hooks/useGeolocationMission';
import { useLocalNotifications } from '../hooks/useLocalNotifications';

const REQUIRED_METERS = 50;

export default function MovementMission() {
  const { progress, complete } = useMissions();
  const geo = useGeolocationMission();
  const { notify } = useLocalNotifications();

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Evita ejecutar el guardado varias veces al alcanzar el objetivo.
  const completing = useRef(false);

  const completed = progress.missions.movement;

  useEffect(() => {
    if (!geo.reached || completed || completing.current) {
      return;
    }

    completing.current = true;

    async function saveMission() {
      setSaving(true);
      setError('');

      try {
        const fresh = await complete('movement');

        if (fresh) {
          // Las notificaciones no deben impedir completar la misión.
          try {
            await notify(
              'Has completado una misión',
              'Movimiento real: +40 puntos'
            );

            const totalCompleted = Object.values({
              ...progress.missions,
              movement: true
            }).filter(Boolean).length;

            if (totalCompleted === 2) {
              await notify(
                'Te falta 1 misión para completar',
                '¡Solo falta una!'
              );
            }
          } catch (notificationError) {
            console.warn(
              'No se pudo mostrar la notificación:',
              notificationError
            );
          }
        }

        await geo.stop();
      } catch (e) {
        setError(
          e instanceof Error ? e.message : String(e)
        );

        // Permite reintentar el guardado si Firebase falla.
        completing.current = false;
      } finally {
        setSaving(false);
      }
    }

    void saveMission();
  }, [geo.reached, completed, complete, notify, progress.missions]);

  const distance = Math.round(geo.meters);
  const progressValue = Math.min(geo.meters / REQUIRED_METERS, 1);

  return (
    <PageShell title="Misión 2: Movimiento">
      <h2>Recorre más de 50 metros</h2>

      <p>
        Inicia el seguimiento GPS y aléjate más de 30 metros
        de tu posición inicial para completar la misión.
      </p>

      <div className="distance-display">
        {distance}
        <small> / {REQUIRED_METERS} m</small>
      </div>

      <IonProgressBar
        value={progressValue}
        color="success"
      />

      {geo.accuracy !== null && (
        <p className="hint">
          Precisión GPS: ±{Math.round(geo.accuracy)} m.
        </p>
      )}

      {completed ? (
        <IonBadge color="success">
          Misión completada · +40 puntos
        </IonBadge>
      ) : saving ? (
        <p>
          <IonSpinner name="crescent" /> Guardando misión...
        </p>
      ) : geo.reached ? (
        <IonBadge color="success">
          Distancia alcanzada
        </IonBadge>
      ) : (
        <div className="button-stack">
          <IonButton
            expand="block"
            disabled={geo.tracking}
            onClick={() => void geo.start()}
          >
            Iniciar seguimiento GPS
          </IonButton>

          <IonButton
            expand="block"
            fill="outline"
            color="medium"
            disabled={!geo.tracking}
            onClick={() => void geo.stop()}
          >
            Detener seguimiento
          </IonButton>
        </div>
      )}

      {geo.tracking && (
        <p className="hint">
          {geo.waitingForFix
            ? 'Buscando tu ubicación inicial...'
            : 'Seguimiento activo. Camina hasta superar los 30 metros.'}
        </p>
      )}

      {(geo.error || error) && (
        <IonText color="danger">
          <p>{error || geo.error}</p>
        </IonText>
      )}
    </PageShell>
  );
}
