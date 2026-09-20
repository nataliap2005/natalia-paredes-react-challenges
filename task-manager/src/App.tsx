import type {ReactElement,ReactNode} from "react";
import {Navigate,Route} from "react-router-dom";
import {IonApp,IonContent,IonPage,IonRouterOutlet,IonSpinner,setupIonicReact} from "@ionic/react";
import {IonReactRouter} from "@ionic/react-router";
import {AuthProvider,useAuth} from "./contexts/AuthContext";
import {TaskProvider} from "./contexts/TaskContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskDetail from "./pages/TaskDetail";
import TaskForm from "./pages/TaskForm";

import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";
import "./theme/app.css";

setupIonicReact();

function LoadingScreen():ReactElement{
  return <IonPage><IonContent className="app-background"><div className="center-state fullscreen"><IonSpinner name="crescent"/></div></IonContent></IonPage>;
}

function ProtectedRoute({children}:{children:ReactNode}):ReactElement{
  const {user,loading}=useAuth();
  if(loading)return <LoadingScreen/>;
  return user?<>{children}</>:<Navigate to="/login" replace/>;
}

function PublicRoute({children}:{children:ReactNode}):ReactElement{
  const {user,loading}=useAuth();
  if(loading)return <LoadingScreen/>;
  return user?<Navigate to="/home" replace/>:<>{children}</>;
}

function AppRoutes():ReactElement{
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
        <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/tasks/new" element={<ProtectedRoute><TaskForm/></ProtectedRoute>}/>
        <Route path="/tasks/edit/:id" element={<ProtectedRoute><TaskForm/></ProtectedRoute>}/>
        <Route path="/tasks/:id" element={<ProtectedRoute><TaskDetail/></ProtectedRoute>}/>
        <Route path="/" element={<Navigate to="/home" replace/>}/>
        <Route path="*" element={<Navigate to="/home" replace/>}/>
      </IonRouterOutlet>
    </IonReactRouter>
  );
}

const App:React.FC=()=> (
  <IonApp>
    <AuthProvider>
      <TaskProvider>
        <AppRoutes/>
      </TaskProvider>
    </AuthProvider>
  </IonApp>
);

export default App;
