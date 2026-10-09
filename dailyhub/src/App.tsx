import { Navigate, Route } from 'react-router-dom';
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, IonSpinner, setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { homeOutline, peopleOutline, checkboxOutline, nutritionOutline } from 'ionicons/icons';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Tasks from './pages/Tasks';
import Fruits from './pages/Fruits';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/app.css';

setupIonicReact();

// Cada pestaña tiene una ruta dentro de /tabs.
function DailyHubTabs() {
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="home" element={<Home />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="fruits" element={<Fruits />} />
        <Route index element={<Navigate to="/tabs/home" replace />} />
        <Route path="*" element={<Navigate to="/tabs/home" replace />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/tabs/home"><IonIcon icon={homeOutline} /><IonLabel>Inicio</IonLabel></IonTabButton>
        <IonTabButton tab="contacts" href="/tabs/contacts"><IonIcon icon={peopleOutline} /><IonLabel>Contactos</IonLabel></IonTabButton>
        <IonTabButton tab="tasks" href="/tabs/tasks"><IonIcon icon={checkboxOutline} /><IonLabel>Tareas</IonLabel></IonTabButton>
        <IonTabButton tab="fruits" href="/tabs/fruits"><IonIcon icon={nutritionOutline} /><IonLabel>Frutas</IonLabel></IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

// Espera la restauración de Firebase Auth y protege las rutas privadas.
function AppRoutes() {
  const { user, loading } = useAuth();
  if (loading) return <div className="loading"><IonSpinner name="crescent" /></div>;
  return (
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={user ? <Navigate to="/tabs/home" replace /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/tabs/home" replace /> : <Register />} />
        <Route path="/tabs/*" element={user ? <DailyHubTabs /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to={user ? '/tabs/home' : '/login'} replace />} />
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

export default function App() {
  return <IonApp><AuthProvider><AppRoutes /></AuthProvider></IonApp>;
}
