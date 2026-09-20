import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext";
import {useTasks} from "../contexts/TaskContext";

function Home(){
  const {user,logout}=useAuth();
  const {tasks,loading,updateTask,deleteTask}=useTasks();
  const navigate=useNavigate();

  const handleLogout=async():Promise<void>=>{
    await logout();
    navigate("/login",{replace:true});
  };

  const handleDelete=async(id:string):Promise<void>=>{
    if(window.confirm("¿Deseas eliminar esta tarea?"))await deleteTask(id);
  };

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar className="main-toolbar">
          <IonTitle>Mis tareas</IonTitle>
          <IonButtons slot="end">
            <IonButton className="logout-button" onClick={handleLogout}>Cerrar sesión</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="app-background">
        <main className="task-container">
          <section className="welcome-panel">
            <div>
              <span className="eyebrow">TASKFLOW</span>
              <h1>Hola, {user?.email?.split("@")[0]}</h1>
              <p>Tienes {tasks.filter(task=>!task.completed).length} tarea(s) pendiente(s).</p>
            </div>
            <IonButton className="add-button" routerLink="/tasks/new">+ Nueva tarea</IonButton>
          </section>

          {loading&&(
            <div className="center-state">
              <IonSpinner name="crescent"/>
              <p>Cargando tus tareas...</p>
            </div>
          )}

          {!loading&&tasks.length===0&&(
            <section className="empty-state">
              <div className="empty-icon">✓</div>
              <h2>Todo está al día</h2>
              <p>Aún no tienes tareas. Crea la primera para comenzar.</p>
              <IonButton routerLink="/tasks/new">Crear una tarea</IonButton>
            </section>
          )}

          {!loading&&tasks.length>0&&(
            <section className="task-grid">
              {tasks.map(task=>(
                <IonCard key={task.id} className={`task-card ${task.completed?"task-completed":""}`}>
                  <IonCardContent>
                    <div className="task-card-header">
                      <IonCheckbox checked={task.completed} onIonChange={event=>updateTask(task.id,{completed:event.detail.checked})}/>
                      <span className={`status-pill ${task.completed?"done":"pending"}`}>
                        {task.completed?"Completada":"Pendiente"}
                      </span>
                    </div>
                    <h2>{task.title}</h2>
                    <p>{task.description||"Sin descripción"}</p>
                    <div className="task-actions">
                      <IonButton fill="clear" size="small" onClick={()=>navigate(`/tasks/${task.id}`)}>Ver detalle</IonButton>
                      <IonButton fill="clear" size="small" color="medium" onClick={()=>navigate(`/tasks/edit/${task.id}`)}>Editar</IonButton>
                      <IonButton fill="clear" size="small" color="danger" onClick={()=>handleDelete(task.id)}>Eliminar</IonButton>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </section>
          )}
        </main>
      </IonContent>
    </IonPage>
  );
}

export default Home;
