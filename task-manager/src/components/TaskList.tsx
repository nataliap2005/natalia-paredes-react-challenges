import { IonList } from '@ionic/react';
import TaskItem from './TaskItem';
import { Tarea } from '../pages/Home';

interface Props {
  tareas: Tarea[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

function TaskList({ tareas, onToggle, onDelete }: Props) {
  return (
    <IonList>
      {tareas.map(t => (
        <TaskItem
          key={t.id}
          tarea={t}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </IonList>
  );
}

export default TaskList;