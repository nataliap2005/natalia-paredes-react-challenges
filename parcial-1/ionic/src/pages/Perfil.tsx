import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
} from "@ionic/react";

import {useNavigate} from "react-router-dom";

function Perfil(){
    const navigate=useNavigate();

    const cerrarSesion=()=>{
        localStorage.removeItem("loggedIonic");
        navigate("/login");
    };

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <h2>Médico MediClinic</h2>

                <IonButton
                    expand="block"
                    color="danger"
                    onClick={cerrarSesion}
                >
                    Cerrar sesión
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Perfil;