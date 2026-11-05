import {IonButton,IonIcon,IonSpinner} from '@ionic/react';
import {locateOutline,playOutline,stopOutline,saveOutline} from 'ionicons/icons';
export default function TrackingControls({tracking,busy,onLocate,onStart,onStop}:{tracking:boolean;busy:boolean;onLocate:()=>void;onStart:()=>void;onStop:()=>void}){
 return <div className="control-row">
  <IonButton disabled={busy} fill="outline" onClick={onLocate}><IonIcon slot="start" icon={locateOutline}/>Ubicación</IonButton>
  {tracking?<IonButton disabled={busy} color="danger" onClick={onStop}><IonIcon slot="start" icon={saveOutline}/>Detener y guardar</IonButton>
   :<IonButton disabled={busy} onClick={onStart}>{busy?<IonSpinner name="crescent"/>:<IonIcon slot="start" icon={playOutline}/>}Iniciar ruta</IonButton>}
 </div>;
}
