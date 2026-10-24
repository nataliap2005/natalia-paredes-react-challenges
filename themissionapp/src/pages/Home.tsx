import {IonButton,IonIcon,IonList,IonText} from '@ionic/react';import {trophyOutline,logOutOutline,statsChartOutline} from 'ionicons/icons';
import PageShell from '../components/PageShell';import MissionCard from '../components/MissionCard';import ProgressSummary from '../components/ProgressSummary';
import {useAuth} from '../contexts/AuthContext';import {useMissions} from '../contexts/MissionsContext';import {missionDefinitions} from '../types/mission';import {logoutUser} from '../services/authService';
export default function Home(){const {user}=useAuth();const {progress,error}=useMissions();
 return <PageShell title="TheMissionApp" back={false}><div className="hero"><p>BIENVENIDA/O</p><h1>¡Hola, {user?.displayName||'explorador'}!</h1><span>Completa las misiones usando los sensores de tu celular.</span></div>
 <ProgressSummary/><h2 className="section-title">Misiones</h2><IonList inset>{missionDefinitions.map(m=><MissionCard key={m.id} {...m} href={`/mission/${m.id}`} completed={progress.missions[m.id]} locked={m.id==='stillness'&&!progress.missions.movement}/>)}</IonList>
 {error&&<IonText color="danger"><p>{error}</p></IonText>}<div className="nav-buttons"><IonButton routerLink="/results" expand="block"><IonIcon icon={statsChartOutline} slot="start"/>Resultados</IonButton>
 <IonButton routerLink="/ranking" expand="block" color="secondary"><IonIcon icon={trophyOutline} slot="start"/>Ranking</IonButton><IonButton fill="outline" color="medium" expand="block" onClick={()=>void logoutUser()}><IonIcon icon={logOutOutline} slot="start"/>Cerrar sesión</IonButton></div></PageShell>;
}
