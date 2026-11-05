import { IonButton, IonCheckbox, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { pencilOutline, trashOutline } from 'ionicons/icons';
import type { Task } from '../types/task';
export default function TaskCard({
  task,
  busy,
  onToggle,
  onEdit,
  onDelete,
}: {
  task: Task;
  busy: boolean;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <IonItem className="task-item" lines="full">
      <IonCheckbox
        slot="start"
        checked={task.completada}
        disabled={busy}
        onIonChange={onToggle}
        aria-label={`Completar ${task.titulo}`}
      />
      <IonLabel className={task.completada ? 'task-done' : ''}>{task.titulo}</IonLabel>
      <IonButton slot="end" fill="clear" disabled={busy} onClick={onEdit} aria-label="Editar tarea">
        <IonIcon icon={pencilOutline} />
      </IonButton>
      <IonButton slot="end" fill="clear" color="danger" disabled={busy} onClick={onDelete} aria-label="Eliminar tarea">
        <IonIcon icon={trashOutline} />
      </IonButton>
    </IonItem>
  );
}
