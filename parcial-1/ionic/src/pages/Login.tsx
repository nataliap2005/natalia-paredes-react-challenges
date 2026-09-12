import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonButton,
    IonToast
} from "@ionic/react";

import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Login(){
    const [usuario,setUsuario]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState(false);

    const navigate=useNavigate();

    const iniciarSesion=()=>{
        if(usuario==="medico" && password==="123"){
            localStorage.setItem("loggedIonic","true");
            navigate("/tabs/visitas");
        }else{
            setError(true);
        }
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>MediClinic</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <IonInput
                    label="Usuario"
                    value={usuario}
                    onIonInput={(e)=>setUsuario(e.detail.value || "")}
                />

                <IonInput
                    label="Contraseña"
                    type="password"
                    value={password}
                    onIonInput={(e)=>setPassword(e.detail.value || "")}
                />

                <IonButton expand="block" onClick={iniciarSesion}>
                    Ingresar
                </IonButton>

                <IonToast
                    isOpen={error}
                    message="Credenciales incorrectas"
                    duration={2000}
                    onDidDismiss={()=>setError(false)}
                />

            </IonContent>
        </IonPage>
    );
}

export default Login;