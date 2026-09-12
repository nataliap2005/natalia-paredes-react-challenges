import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel
} from "@ionic/react";

import {useEffect,useState} from "react";
import {useNavigate} from "react-router-dom";

function Visitas(){
    const [visitas,setVisitas]=useState<any[]>([]);
    const navigate=useNavigate();

    useEffect(()=>{
        const datos=localStorage.getItem("visitas");

        if(datos){
            setVisitas(JSON.parse(datos));
        }else{
            const visitasIniciales=[
                {
                    id:1,
                    paciente:"Luis Perez",
                    hora:"08:00",
                    estado:"pendiente"
                },
                {
                    id:2,
                    paciente:"Lucia Zamorano",
                    hora:"10:30",
                    estado:"pendiente"
                },
                {
                    id:3,
                    paciente:"Juan Hoyos",
                    hora:"14:00",
                    estado:"pendiente"
                }
            ];

            localStorage.setItem(
                "visitas",
                JSON.stringify(visitasIniciales)
            );

            setVisitas(visitasIniciales);
        }
    },[]);

    const verDetalle=(id:number)=>{
        navigate(`/detalle/${id}`);
    };

    return(
        <IonPage>

            <IonHeader>
                <IonToolbar>
                    <IonTitle>Visitas del día</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>

                <IonList>
                    {visitas.map((visita)=>(
                        <IonItem
                            key={visita.id}
                            button
                            onClick={()=>verDetalle(visita.id)}
                        >
                            <IonLabel>
                                <h2>{visita.paciente}</h2>
                                <p>Hora: {visita.hora}</p>
                                <p>Estado: {visita.estado}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>

            </IonContent>

        </IonPage>
    );
}

export default Visitas;