import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar
} from "@ionic/react";
import {useNavigate,useParams} from "react-router-dom";
import {useTasks} from "../contexts/TaskContext";

function TaskDetail(){
  const {id=""}=useParams<{id:string}>();
  const {loading,getTask,deleteTask}=useTasks();
  const navigate=useNavigate();
  const task=getTask(id);

  const handleDelete=async():Promise<void>=>{
    if(window.confirm("¿Deseas eliminar esta tarea?")){
      await deleteTask(id);
      navigate("/home",{replace:true});
    }
  };

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar className="main-toolbar">
          <IonButtons slot="start"><IonBackButton defaultHref="/home"/></IonButtons>
          <IonTitle>Detalle de tarea</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-background ion-padding">
        {loading&&<div className="center-state"><IonSpinner name="crescent"/></div>}
        {!loading&&!task&&(
          <section className="empty-state">
            <h2>Tarea no encontrada</h2>
            <IonButton routerLink="/home">Volver a mis tareas</IonButton>
          </section>
        )}
        {!loading&&task&&(
          <IonCard className="detail-card">
            <IonCardContent>
              <span className={`status-pill ${task.completed?"done":"pending"}`}>{task.completed?"Completada":"Pendiente"}</span>
              <h1>{task.title}</h1>
              <p>{task.description||"Esta tarea no tiene descripción."}</p>
              <div className="form-actions">
                <IonButton onClick={()=>navigate(`/tasks/edit/${task.id}`)}>Editar</IonButton>
                <IonButton fill="outline" color="danger" onClick={handleDelete}>Eliminar</IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
}

export default TaskDetail;
