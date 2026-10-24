import {useEffect,useState} from 'react';import {IonButton,IonText,IonSpinner} from '@ionic/react';
import PageShell from '../components/PageShell';import {useAuth} from '../contexts/AuthContext';import {useMissions} from '../contexts/MissionsContext';
import {useCameraMission} from '../hooks/useCameraMission';import {useLocalNotifications} from '../hooks/useLocalNotifications';
export default function PhotoMission(){const {user}=useAuth();const {progress,complete}=useMissions();const {capture,restore,preview,busy}=useCameraMission();const {notify}=useLocalNotifications();const [error,setError]=useState('');
 useEffect(()=>{if(user)void restore(user.uid)},[user]);
 async function take(){if(!user)return;setError('');try{await capture(user.uid);if(await complete('photo')){await notify('Has completado una misión','Evidencia fotográfica: +40 puntos');if(Object.values({...progress.missions,photo:true}).filter(Boolean).length===2)await notify('Te falta 1 misión para completar','¡Sigue así!');}}catch(e){setError(e instanceof Error?e.message:String(e))}}
 return <PageShell title="Misión 1: Evidencia"><h2>Captura una foto</h2><p>Toma una fotografía con la cámara y guárdala en el almacenamiento de la aplicación para completar la misión.</p>
 {preview&&<img className="photo-preview" src={preview} alt="Evidencia capturada"/>}
 <IonButton expand="block" onClick={()=>void take()} disabled={busy}>{busy?<IonSpinner name="crescent"/>:progress.missions.photo?'Volver a tomar foto':'Abrir cámara y guardar'}</IonButton>
 {progress.missions.photo&&<p className="success-text">✓ Misión completada · +40 puntos</p>}{error&&<IonText color="danger"><p>{error}</p></IonText>}
 <p className="hint">La fotografía se guarda localmente; no se publica en el ranking.</p></PageShell>;
}
