import {
    IonApp,
    IonRouterOutlet,
    setupIonicReact
} from "@ionic/react";

import {IonReactRouter} from "@ionic/react-router";
import {Route,Navigate} from "react-router-dom";

import Login from "./pages/Login";
import Tabs from "./pages/Tabs";
import DetalleVisita from "./pages/DetalleVisita";

import "@ionic/react/css/core.css";

setupIonicReact();

function App(){
    return(
        <IonApp>
            <IonReactRouter>

                <IonRouterOutlet>

                    <Route
                        path="/login"
                        element={<Login/>}
                    />

                    <Route
                        path="/tabs/*"
                        element={<Tabs/>}
                    />

                    <Route
                        path="/detalle/:id"
                        element={<DetalleVisita/>}
                    />

                    <Route
                        path="/"
                        element={<Navigate to="/login"/>}
                    />

                </IonRouterOutlet>

            </IonReactRouter>
        </IonApp>
    );
}

export default App;