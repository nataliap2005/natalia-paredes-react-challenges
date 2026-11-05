import {IonApp,IonRouterOutlet,setupIonicReact} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';
import {Navigate,Route} from 'react-router-dom';
import Home from './pages/Home';
import MapPage from './pages/MapPage';
import History from './pages/History';
import Settings from './pages/Settings';
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
import './theme/variables.css';
import './theme/app.css';
setupIonicReact();
export default function App(){return <IonApp><IonReactRouter><IonRouterOutlet>
<Route path="/home" element={<Home/>}/>
<Route path="/map" element={<MapPage/>}/>
<Route path="/history" element={<History/>}/>
<Route path="/settings" element={<Settings/>}/>
<Route path="/" element={<Navigate to="/home" replace/>}/>
</IonRouterOutlet></IonReactRouter></IonApp>}
