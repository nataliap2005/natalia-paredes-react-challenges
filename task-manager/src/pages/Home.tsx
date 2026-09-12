import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

function Home() {
  const [tareas, setTareas] = useState<Tarea[]>([]);

  const addTarea = (texto: string) => {
    setTareas(prev => [...prev, { id: Date.now(), texto, completada: false }]);
  };

  const toggleTarea = (id: number) => {
    setTareas(prev =>
      prev.map(t => t.id === id ? { ...t, completada: !t.completada } : t)
    );
  };

  const deleteTarea = (id: number) => {
    setTareas(prev => prev.filter(t => t.id !== id));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <TaskForm onAddTarea={addTarea} />
        <TaskList
          tareas={tareas}
          onToggle={toggleTarea}
          onDelete={deleteTarea}
        />
      </IonContent>
    </IonPage>
  );
}

export default Home;