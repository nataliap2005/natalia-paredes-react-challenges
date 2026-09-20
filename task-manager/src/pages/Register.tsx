import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonItem,
  IonPage,
  IonSpinner,
  IonText,
  IonToast
} from "@ionic/react";
import {useAuth} from "../contexts/AuthContext";

function Register(){
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [confirmPassword,setConfirmPassword]=useState<string>("");
  const [submitting,setSubmitting]=useState<boolean>(false);
  const [message,setMessage]=useState<string>("");
  const {register}=useAuth();
  const navigate=useNavigate();

  const handleRegister=async():Promise<void>=>{
    if(!email.trim()||!password||!confirmPassword){
      setMessage("Completa todos los campos");
      return;
    }
    if(password.length<6){
      setMessage("La contraseña debe tener mínimo 6 caracteres");
      return;
    }
    if(password!==confirmPassword){
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try{
      setSubmitting(true);
      await register(email.trim(),password);
      navigate("/home",{replace:true});
    }catch(error:unknown){
      console.error("Error al registrar:",error);
      setMessage("No fue posible crear la cuenta. Verifica el correo");
    }finally{
      setSubmitting(false);
    }
  };

  return(
    <IonPage>
      <IonContent fullscreen className="auth-background">
        <div className="auth-container">
          <div className="brand-mark">＋</div>
          <IonText className="auth-heading">
            <h1>Crea tu cuenta</h1>
            <p>Empieza a organizar tus tareas en segundos.</p>
          </IonText>

          <IonCard className="auth-card">
            <IonCardContent>
              <h2>Registro</h2>
              <p className="auth-subtitle">Todos los campos son obligatorios</p>

              <IonItem className="form-item" lines="none">
                <IonInput label="Correo electrónico" labelPlacement="stacked" type="email" value={email} autocomplete="email" onIonInput={event=>setEmail(event.detail.value||"")}/>
              </IonItem>
              <IonItem className="form-item" lines="none">
                <IonInput label="Contraseña" labelPlacement="stacked" type="password" value={password} autocomplete="new-password" onIonInput={event=>setPassword(event.detail.value||"")}/>
              </IonItem>
              <IonItem className="form-item" lines="none">
                <IonInput label="Confirmar contraseña" labelPlacement="stacked" type="password" value={confirmPassword} autocomplete="new-password" onIonInput={event=>setConfirmPassword(event.detail.value||"")}/>
              </IonItem>

              <IonButton expand="block" className="primary-action" onClick={handleRegister} disabled={submitting}>
                {submitting?<IonSpinner name="crescent"/>:"Crear cuenta"}
              </IonButton>

              <div className="auth-link">
                <span>¿Ya tienes una cuenta?</span>
                <IonButton fill="clear" size="small" routerLink="/login">Inicia sesión</IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast isOpen={Boolean(message)} message={message} duration={2400} color="danger" onDidDismiss={()=>setMessage("")}/>
      </IonContent>
    </IonPage>
  );
}

export default Register;
