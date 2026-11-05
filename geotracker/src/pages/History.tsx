import {useEffect,useState} from 'react';
import {IonPage,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonButton,IonText,IonSpinner} from '@ionic/react';
import {loadTracks,deleteTrack,type Track} from '../services/trackingStorage';
import MapComponent from '../components/MapComponent';
export default function History(){
 const [tracks,setTracks]=useState<Track[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');const [selected,setSelected]=useState<string|null>(null);
 async function refresh(){setLoading(true);setError('');try{setTracks(await loadTracks());}catch(e){setError(String(e));}finally{setLoading(false);}}
 useEffect(()=>{void refresh();},[]);
 async function remove(id:string){try{await deleteTrack(id);setTracks(t=>t.filter(x=>x.id!==id));if(selected===id)setSelected(null);}catch(e){setError(String(e));}}
 return <IonPage><IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/home"/></IonButtons><IonTitle>Historial JSON</IonTitle></IonToolbar></IonHeader><IonContent className="ion-padding"><div className="page-shell">
 <h1>Recorridos guardados</h1><p className="hint">Se almacenan en el archivo <code>geotracker-routes.json</code> del dispositivo.</p>
 <IonButton fill="outline" onClick={()=>void refresh()}>Actualizar historial</IonButton>
 {loading&&<IonSpinner/>}{error&&<IonText color="danger"><p>{error}</p></IonText>}
 {!loading&&!tracks.length&&<div className="panel"><p>Aún no hay recorridos. Abre el mapa, inicia el seguimiento y pulsa «Detener y guardar».</p></div>}
 {tracks.map(t=><IonCard key={t.id}><IonCardHeader><IonCardTitle>{new Date(t.startedAt).toLocaleString('es-CO')}</IonCardTitle></IonCardHeader><IonCardContent>
 <p>{Math.round(t.distanceMeters)} metros · {t.points.length} puntos · Finalizó {new Date(t.endedAt).toLocaleTimeString('es-CO')}</p>
 <div className="control-row"><IonButton fill="outline" onClick={()=>setSelected(selected===t.id?null:t.id)}>{selected===t.id?'Ocultar mapa':'Ver recorrido'}</IonButton><IonButton fill="clear" color="danger" onClick={()=>void remove(t.id)}>Eliminar</IonButton></div>
 {selected===t.id&&<MapComponent position={t.points.at(-1)??null} path={t.points}/>}
 </IonCardContent></IonCard>)}
 </div></IonContent></IonPage>
}
