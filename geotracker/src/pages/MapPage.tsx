import {useEffect,useRef,useState} from 'react';
import {IonPage,IonHeader,IonToolbar,IonButtons,IonBackButton,IonTitle,IonContent,IonButton,IonIcon,IonText,IonSpinner,IonChip} from '@ionic/react';
import {cameraOutline,locationOutline} from 'ionicons/icons';
import MapComponent from '../components/MapComponent';
import TrackingControls from '../components/TrackingControls';
import {useGeolocation} from '../hooks/useGeolocation';
import {useNetwork} from '../hooks/useNetwork';
import {useBattery} from '../hooks/useBattery';
import {useMotion} from '../hooks/useMotion';
import {getAddress} from '../services/opencage';
import {Camera,CameraResultType,CameraSource} from '@capacitor/camera';
import {Filesystem,Directory} from '@capacitor/filesystem';
import {LocalNotifications} from '@capacitor/local-notifications';

async function saveWatermarkedPhoto(lat:number,lng:number):Promise<string>{
 const photo=await Camera.getPhoto({quality:75,allowEditing:false,source:CameraSource.Camera,resultType:CameraResultType.Uri});
 if(!photo.webPath)throw new Error('La cámara no devolvió una imagen.');
 const image=new Image();image.crossOrigin='anonymous';image.src=photo.webPath;
 await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=()=>reject(new Error('No se pudo abrir la foto.'));});
 const canvas=document.createElement('canvas');canvas.width=image.naturalWidth;canvas.height=image.naturalHeight;
 const ctx=canvas.getContext('2d');if(!ctx)throw new Error('No se pudo procesar la fotografía.');
 ctx.drawImage(image,0,0);
 const fontSize=Math.max(22,Math.round(canvas.width*0.035));const pad=Math.round(fontSize*.7);
 const text=`GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}  ·  ${new Date().toLocaleString('es-CO')}`;
 ctx.font=`bold ${fontSize}px sans-serif`;const bar=Math.max(fontSize*2,Math.round(fontSize*1.9));
 ctx.fillStyle='rgba(0,0,0,.72)';ctx.fillRect(0,canvas.height-bar,canvas.width,bar);
 ctx.fillStyle='white';ctx.fillText(text,pad,canvas.height-bar+fontSize+8,canvas.width-pad*2);
 const data=canvas.toDataURL('image/jpeg',.82).split(',')[1];
 const name=`foto-${Date.now()}.jpg`;
 await Filesystem.writeFile({path:name,data,directory:Directory.Data});
 return name;
}
export default function MapPage(){
 const geo=useGeolocation();const net=useNetwork();const {battery,refresh}=useBattery();const motion=useMotion();
 const [address,setAddress]=useState('');const [busy,setBusy]=useState(false);const [message,setMessage]=useState('');const [operationError,setOperationError]=useState('');
 const lastNotice=useRef(0);
 useEffect(()=>{
  if(!geo.tracking)return;
  if(!net.connected&&Date.now()-lastNotice.current>60000){lastNotice.current=Date.now();setMessage('Sin internet: el GPS puede registrar la ruta, pero el mapa y OpenCage necesitan conexión.');}
 },[net.connected,geo.tracking]);
 useEffect(()=>{
  if(!geo.tracking||battery?.batteryLevel===undefined||battery.batteryLevel===null)return;
  if(battery.batteryLevel<=.15&&!battery.isCharging){
    void geo.stopTracking(true).then(()=>setMessage('Ruta guardada: seguimiento detenido por batería baja.')).catch(e=>setOperationError(String(e)));
  }
 },[battery?.batteryLevel,battery?.isCharging,geo.tracking]);
 async function run(action:()=>Promise<unknown>){setOperationError('');setBusy(true);try{await action();}catch(e){setOperationError(e instanceof Error?e.message:String(e));}finally{setBusy(false);}}
 const location=()=>run(async()=>{await geo.getCurrentLocation();setMessage('Posición actualizada.');});
 const addressLookup=()=>run(async()=>{
  if(!net.connected)throw new Error('Necesitas internet para consultar OpenCage.');
  const pos=geo.position??await geo.getCurrentLocation();setAddress(await getAddress(pos.lat,pos.lng));
 });
 const capture=()=>run(async()=>{
  const pos=geo.position??await geo.getCurrentLocation();
  const file=await saveWatermarkedPhoto(pos.lat,pos.lng);
  setMessage(`Fotografía guardada con coordenadas en el almacenamiento privado: ${file}`);
 });
 const stop=()=>run(async()=>{const saved=await geo.stopTracking(true);setMessage(saved?`Ruta guardada: ${saved.points.length} puntos · ${Math.round(saved.distanceMeters)} m`:'No hubo posiciones válidas para guardar.');await refresh();});
 const start=()=>run(async()=>{await geo.startTracking();await refresh();});
 return <IonPage><IonHeader><IonToolbar><IonButtons slot="start"><IonBackButton defaultHref="/home"/></IonButtons><IonTitle>Mapa en vivo</IonTitle></IonToolbar></IonHeader>
 <IonContent className="ion-padding"><div className="page-shell">
  <div className="status-row"><IonChip color={net.connected?'success':'danger'}>{net.connected?'Con conexión':'Sin conexión'}</IonChip><IonChip color={geo.tracking?'primary':'medium'}>{geo.tracking?'Grabando ruta':'En pausa'}</IonChip></div>
  <MapComponent position={geo.position} path={geo.path}/>
  <div className="metrics"><div><strong>{Math.round(geo.distance)}</strong><span>Metros registrados</span></div><div><strong>{geo.path.length}</strong><span>Puntos GPS</span></div><div><strong>{geo.position?.accuracy?`±${Math.round(geo.position.accuracy)} m`:'—'}</strong><span>Precisión</span></div></div>
  <TrackingControls tracking={geo.tracking} busy={busy} onLocate={location} onStart={start} onStop={stop}/>
  <p className="hint">{geo.status}</p>
  <div className="panel"><h3>Dirección y fotografía</h3><p>El mapa usa OpenStreetMap. OpenCage convierte la ubicación actual en una dirección.</p>
   <IonButton expand="block" fill="outline" disabled={busy||!net.connected} onClick={addressLookup}><IonIcon slot="start" icon={locationOutline}/>Consultar dirección</IonButton>
   {address&&<p><b>Dirección:</b> {address}</p>}
   <IonButton expand="block" color="secondary" disabled={busy} onClick={capture}><IonIcon slot="start" icon={cameraOutline}/>Foto con marca de agua GPS</IonButton>
  </div>
  <p className="hint">Movimiento del dispositivo: {motion.supported?(motion.moving?'detectado':'sin movimiento significativo'):'no disponible'}. Batería: {battery?.batteryLevel!=null?`${Math.round(battery.batteryLevel*100)} %`:'desconocida'}.</p>
  {busy&&<IonSpinner name="crescent"/>}
  {message&&<IonText color="success"><p role="status">{message}</p></IonText>}
  {(geo.error||operationError)&&<IonText color="danger"><p role="alert">{operationError||geo.error}</p></IonText>}
  <p className="hint">El GPS y los sensores se validan mejor en el celular. El seguimiento funciona con la app abierta; no es un servicio en segundo plano.</p>
 </div></IonContent></IonPage>
}
