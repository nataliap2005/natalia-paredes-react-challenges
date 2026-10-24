import {IonCard,IonCardContent,IonProgressBar,IonBadge} from '@ionic/react';
import {useMissions} from '../contexts/MissionsContext';
export default function ProgressSummary(){const {progress}=useMissions();const count=Object.values(progress.missions).filter(Boolean).length;
 return <IonCard className="progress-card"><IonCardContent><div className="summary-row"><strong>Tu progreso</strong><IonBadge color="warning">{progress.points} puntos</IonBadge></div>
 <div className="summary-row"><span>{count} de 3 misiones</span><b>{Math.round(count/3*100)}%</b></div><IonProgressBar value={count/3} color="success" /></IonCardContent></IonCard>;
}
