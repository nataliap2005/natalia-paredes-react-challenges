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

function Login(){
  const [email,setEmail]=useState<string>("");
  const [password,setPassword]=useState<string>("");
  const [submitting,setSubmitting]=useState<boolean>(false);
  const [message,setMessage]=useState<string>("");
  const {login}=useAuth();
  const navigate=useNavigate();

  const handleLogin=async():Promise<void>=>{
    if(!email.trim()||!password){
      setMessage("Completa el correo y la contraseña");
      return;
    }

    try{
      setSubmitting(true);
      await login(email.trim(),password);
      navigate("/home",{replace:true});
    }catch(error:unknown){
      console.error("Error al iniciar sesión:",error);
      setMessage("Correo o contraseña incorrectos");
    }finally{
      setSubmitting(false);
    }
  };

  return(
    <IonPage>
      <IonContent fullscreen className="auth-background">
        <div className="auth-container">
          <div className="brand-mark">✓</div>
          <IonText className="auth-heading">
            <h1>TaskFlow</h1>
            <p>Organiza tus tareas y cumple tus objetivos.</p>
          </IonText>

          <IonCard className="auth-card">
            <IonCardContent>
              <h2>Bienvenida</h2>
              <p className="auth-subtitle">Inicia sesión para continuar</p>

              <IonItem className="form-item" lines="none">
                <IonInput
                  label="Correo electrónico"
                  labelPlacement="stacked"
                  type="email"
                  value={email}
                  autocomplete="email"
                  onIonInput={event=>setEmail(event.detail.value||"")}
                />
              </IonItem>

              <IonItem className="form-item" lines="none">
                <IonInput
                  label="Contraseña"
                  labelPlacement="stacked"
                  type="password"
                  value={password}
                  autocomplete="current-password"
                  onIonInput={event=>setPassword(event.detail.value||"")}
                />
              </IonItem>

              <IonButton expand="block" className="primary-action" onClick={handleLogin} disabled={submitting}>
                {submitting?<IonSpinner name="crescent"/>:"Iniciar sesión"}
              </IonButton>

              <div className="auth-link">
                <span>¿No tienes una cuenta?</span>
                <IonButton fill="clear" size="small" routerLink="/register">Regístrate</IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast isOpen={Boolean(message)} message={message} duration={2200} color="danger" onDidDismiss={()=>setMessage("")}/>
      </IonContent>
    </IonPage>
  );
}

export default Login;
