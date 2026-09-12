import { IonItem, IonCheckbox, IonLabel, IonButton } from '@ionic/react';
import { Tarea } from '../pages/Home';

interface Props {
  tarea: Tarea;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskItem({ tarea, onToggle, onDelete }: Props) {
  return (
    <IonItem>
      <IonCheckbox
        checked={tarea.completada}
        onIonChange={() => onToggle(tarea.id)}
        slot="start"
      />
      <IonLabel style={{ textDecoration: tarea.completada ? 'line-through' : 'none' }}>
        {tarea.texto}
      </IonLabel>
      <IonButton color="danger" onClick={() => onDelete(tarea.id)} slot="end">
        Eliminar
      </IonButton>
    </IonItem>
  );
}

export default TaskItem;