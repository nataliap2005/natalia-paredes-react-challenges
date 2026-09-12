import {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel
} from "@ionic/react";

import {Route} from "react-router-dom";
import {calendar,people,person} from "ionicons/icons";

import Visitas from "./Visitas";
import Pacientes from "./Pacientes";
import Perfil from "./Perfil";

function Tabs(){
    return(
        <IonTabs>

            <IonRouterOutlet>

                <Route
                    path="/tabs/visitas"
                    element={<Visitas/>}
                />

                <Route
                    path="/tabs/pacientes"
                    element={<Pacientes/>}
                />

                <Route
                    path="/tabs/perfil"
                    element={<Perfil/>}
                />

            </IonRouterOutlet>

            <IonTabBar slot="bottom">

                <IonTabButton
                    tab="visitas"
                    href="/tabs/visitas"
                >
                    <IonIcon icon={calendar}/>
                    <IonLabel>Visitas</IonLabel>
                </IonTabButton>

                <IonTabButton
                    tab="pacientes"
                    href="/tabs/pacientes"
                >
                    <IonIcon icon={people}/>
                    <IonLabel>Pacientes</IonLabel>
                </IonTabButton>

                <IonTabButton
                    tab="perfil"
                    href="/tabs/perfil"
                >
                    <IonIcon icon={person}/>
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>

            </IonTabBar>

        </IonTabs>
    );
}

export default Tabs;