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

function Pacientes(){
    const pacientes=[
        {
            id:1,
            nombre:"Luis Perez",
            cc:"12345678"
        },
        {
            id:2,
            nombre:"Lucia Zamorano",
            cc:"23456781"
        },
        {
            id:3,
            nombre:"Juan Hoyos",
            cc:"102446789"
        }
    ];

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Pacientes</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonList>
                    {pacientes.map((paciente)=>(
                        <IonItem key={paciente.id}>
                            <IonLabel>
                                <h2>{paciente.nombre}</h2>
                                <p>CC: {paciente.cc}</p>
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
}

export default Pacientes;