import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonTextarea,
  IonTitle,
  IonToast,
  IonToolbar
} from "@ionic/react";
import {useTasks} from "../contexts/TaskContext";

function TaskForm(){
  const {id}=useParams<{id:string}>();
  const editing=Boolean(id);
  const {loading,getTask,addTask,updateTask}=useTasks();
  const navigate=useNavigate();
  const [title,setTitle]=useState<string>("");
  const [description,setDescription]=useState<string>("");
  const [completed,setCompleted]=useState<boolean>(false);
  const [saving,setSaving]=useState<boolean>(false);
  const [message,setMessage]=useState<string>("");

  useEffect(()=>{
    if(!id)return;
    const task=getTask(id);
    if(task){
      setTitle(task.title);
      setDescription(task.description);
      setCompleted(task.completed);
    }
  },[id,getTask,loading]);

  const handleSave=():void=>{
  if(!title.trim()){
    setMessage("Escribe un título para la tarea");
    return;
  }

  const data={
    title:title.trim(),
    description:description.trim(),
    completed
  };

  setSaving(true);

  const operation=id
    ?updateTask(id,data)
    :addTask(data);

  operation.catch((error:unknown)=>{
    console.error("Error al guardar la tarea:",error);
  });

  setSaving(false);
  navigate("/home",{replace:true});
};

  return(
    <IonPage>
      <IonHeader>
        <IonToolbar className="main-toolbar">
          <IonButtons slot="start"><IonBackButton defaultHref="/home"/></IonButtons>
          <IonTitle>{editing?"Editar tarea":"Nueva tarea"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="app-background ion-padding">
        <section className="form-panel">
          <span className="eyebrow">{editing?"ACTUALIZAR":"CREAR"}</span>
          <h1>{editing?"Edita los datos":"¿Qué necesitas hacer?"}</h1>

          <IonItem className="form-item" lines="none">
            <IonInput label="Título" labelPlacement="stacked" value={title} maxlength={80} onIonInput={event=>setTitle(event.detail.value||"")}/>
          </IonItem>
          <IonItem className="form-item textarea-item" lines="none">
            <IonTextarea label="Descripción" labelPlacement="stacked" value={description} autoGrow rows={5} maxlength={400} onIonInput={event=>setDescription(event.detail.value||"")}/>
          </IonItem>
          <IonItem className="check-item" lines="none">
            <IonCheckbox checked={completed} onIonChange={event=>setCompleted(event.detail.checked)}>Tarea completada</IonCheckbox>
          </IonItem>

          <div className="form-actions">
            <IonButton fill="outline" color="medium" routerLink="/home">Cancelar</IonButton>
            <IonButton onClick={handleSave} disabled={saving}>{saving?<IonSpinner name="crescent"/>:"Guardar tarea"}</IonButton>
          </div>
        </section>

        <IonToast isOpen={Boolean(message)} message={message} duration={2200} color="danger" onDidDismiss={()=>setMessage("")}/>
      </IonContent>
    </IonPage>
  );
}

export default TaskForm;
