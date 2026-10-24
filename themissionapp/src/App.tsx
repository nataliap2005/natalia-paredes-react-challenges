import {Navigate,Route} from 'react-router-dom';
import {IonApp,IonRouterOutlet,setupIonicReact} from '@ionic/react';import {IonReactRouter} from '@ionic/react-router';
import '@ionic/react/css/core.css';import '@ionic/react/css/normalize.css';import '@ionic/react/css/structure.css';import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';import '@ionic/react/css/float-elements.css';import '@ionic/react/css/text-alignment.css';import '@ionic/react/css/text-transformation.css';import '@ionic/react/css/flex-utils.css';import '@ionic/react/css/display.css';
import './theme/variables.css';import './theme/app.css';
import {AuthProvider} from './contexts/AuthContext';import {MissionsProvider} from './contexts/MissionsContext';import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';import Register from './pages/Register';import Home from './pages/Home';import PhotoMission from './pages/PhotoMission';import MovementMission from './pages/MovementMission';import StillnessMission from './pages/StillnessMission';import Results from './pages/Results';import Ranking from './pages/Ranking';
setupIonicReact();
const secure=(page:React.ReactNode)=><ProtectedRoute>{page}</ProtectedRoute>;
export default function App(){return <IonApp><AuthProvider><MissionsProvider><IonReactRouter><IonRouterOutlet>
 <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
 <Route path="/home" element={secure(<Home/>)}/><Route path="/mission/photo" element={secure(<PhotoMission/>)}/><Route path="/mission/movement" element={secure(<MovementMission/>)}/><Route path="/mission/stillness" element={secure(<StillnessMission/>)}/>
 <Route path="/results" element={secure(<Results/>)}/><Route path="/ranking" element={secure(<Ranking/>)}/><Route path="/" element={<Navigate to="/home" replace/>}/>
 </IonRouterOutlet></IonReactRouter></MissionsProvider></AuthProvider></IonApp>}
