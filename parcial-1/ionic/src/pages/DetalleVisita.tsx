import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton
} from "@ionic/react";

import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";

function DetalleVisita(){
    const {id}=useParams();
    const navigate=useNavigate();

    const [visita,setVisita]=useState<any>(null);

    useEffect(()=>{
        const datos=localStorage.getItem("visitas");

        if(datos){
            const visitas=JSON.parse(datos);

            const encontrada=visitas.find(
                (v:any)=>v.id===Number(id)
            );

            setVisita(encontrada);
        }
    },[id]);

    const cambiarEstado=()=>{
        if(!visita){
            return;
        }

        let nuevoEstado=visita.estado;

        if(visita.estado==="pendiente"){
            nuevoEstado="en_camino";
        }else if(visita.estado==="en_camino"){
            nuevoEstado="finalizada";
        }

        const datos=localStorage.getItem("visitas");

        if(datos){
            const visitas=JSON.parse(datos);

            const nuevasVisitas=visitas.map((v:any)=>{
                if(v.id===visita.id){
                    return {
                        ...v,
                        estado:nuevoEstado
                    };
                }

                return v;
            });

            localStorage.setItem(
                "visitas",
                JSON.stringify(nuevasVisitas)
            );

            setVisita({
                ...visita,
                estado:nuevoEstado
            });
        }
    };

    if(!visita){
        return(
            <IonPage>
                <IonContent className="ion-padding">
                    <p>Visita no encontrada</p>
                </IonContent>
            </IonPage>
        );
    }

    return(
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Detalle de visita</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">

                <h2>{visita.paciente}</h2>

                <p>Hora: {visita.hora}</p>

                <p>Estado: {visita.estado}</p>

                {visita.estado!=="finalizada" && (
                    <IonButton
                        expand="block"
                        onClick={cambiarEstado}
                    >
                        Cambiar estado
                    </IonButton>
                )}

                <IonButton
                    expand="block"
                    fill="outline"
                    onClick={()=>navigate("/tabs/visitas")}
                >
                    Volver
                </IonButton>

            </IonContent>

        </IonPage>
    );
}

export default DetalleVisita;