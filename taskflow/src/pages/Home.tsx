import { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonList,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { personCircleOutline, refreshOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { createTask, editTask, removeTask, toggleTask } from '../services/taskService';
import TaskForm from './TaskForm';
export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tasks, loading, error, refresh } = useTasks(user?.id);
  const [editing, setEditing] = useState<number | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);
  const [actionError, setActionError] = useState('');
  const pending = tasks.filter((t) => !t.completada).length;
  async function perform(id: number, task: () => Promise<void>) {
    setBusyId(id);
    setActionError('');
    try {
      await task();
      await refresh();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusyId(null);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mis tareas</IonTitle>
          <IonButton slot="end" fill="clear" onClick={() => navigate('/profile')} aria-label="Mi perfil">
            <IonIcon icon={personCircleOutline} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="page-container">
          <div className="hero">
            <div className="eyebrow">TASKFLOW</div>
            <h1>Organiza tu día</h1>
            <p>
              {tasks.length} tareas · {pending} pendientes
            </p>
          </div>
          <div className="surface">
            <TaskForm
              onSave={async (title) => {
                if (!user) return;
                await createTask(title, user.id);
                await refresh();
              }}
            />
          </div>
          <div className="section-title">
            <h2>Lista en tiempo real</h2>
            <IonButton size="small" fill="clear" onClick={() => void refresh()}>
              <IonIcon slot="start" icon={refreshOutline} />
              Actualizar
            </IonButton>
          </div>
          {(error || actionError) && (
            <IonText color="danger">
              <p>{actionError || error}</p>
            </IonText>
          )}
          {loading ? (
            <div className="loading-screen">
              <IonSpinner />
            </div>
          ) : !tasks.length ? (
            <p className="empty">Todavía no tienes tareas. Agrega la primera.</p>
          ) : (
            <IonList className="task-list">
              {tasks.map((task) => (
                <div key={task.id}>
                  {editing === task.id ? (
                    <TaskForm
                      currentTitle={task.titulo}
                      onSave={async (title) => {
                        if (!user) return;
                        await editTask(task.id, title, user.id);
                        setEditing(null);
                        await refresh();
                      }}
                      onCancel={() => setEditing(null)}
                    />
                  ) : (
                    <TaskCard
                      task={task}
                      busy={busyId === task.id}
                      onToggle={() => {
                        if (user) void perform(task.id, () => toggleTask(task.id, !task.completada, user.id));
                      }}
                      onEdit={() => setEditing(task.id)}
                      onDelete={() => {
                        if (user && window.confirm('¿Eliminar esta tarea?'))
                          void perform(task.id, () => removeTask(task.id, user.id));
                      }}
                    />
                  )}
                </div>
              ))}
            </IonList>
          )}
          <p className="hint">
            Los cambios se sincronizan mediante Supabase Realtime. Puedes probarlo abriendo otra sesión.
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
