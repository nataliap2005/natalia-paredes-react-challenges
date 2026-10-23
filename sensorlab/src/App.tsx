
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Navigate, Route } from "react-router-dom";

import Home from "./pages/Home";
import GeolocationPage from "./pages/Geolocation";
import CameraPage from "./pages/Camera";
import MotionPage from "./pages/Motion";
import DevicePage from "./pages/Device";
import HapticsPage from "./pages/Haptics";
import FilesystemPage from "./pages/Filesystem";
import LocalNotificationsPage from "./pages/LocalNotifications";
import PushNotificationsPage from "./pages/PushNotifications";

/* Estilos esenciales para el funcionamiento de Ionic */
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Utilidades de diseño de Ionic */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Estilos personalizados */
import "./theme/variables.css";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/home" element={<Home />} />
          <Route path="/geolocation" element={<GeolocationPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/motion" element={<MotionPage />} />
          <Route path="/device" element={<DevicePage />} />
          <Route path="/haptics" element={<HapticsPage />} />
          <Route path="/filesystem" element={<FilesystemPage />} />
          <Route
            path="/local-notifications"
            element={<LocalNotificationsPage />}
          />
          <Route
            path="/push-notifications"
            element={<PushNotificationsPage />}
          />
          <Route path="/" element={<Navigate to="/home" replace />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
