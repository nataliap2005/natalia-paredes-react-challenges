import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonCard,IonCardHeader,IonCardTitle,IonCardContent,IonButton,IonIcon} from '@ionic/react';
import {mapOutline,timeOutline,settingsOutline} from 'ionicons/icons';
export default function Home(){return <IonPage><IonHeader><IonToolbar><IonTitle>GeoTracker</IonTitle></IonToolbar></IonHeader>
<IonContent className="ion-padding"><div className="page-shell">
<div className="hero"><span>CHALLENGE · MAPAS Y APIS</span><h1>Explora, registra y recuerda tus recorridos.</h1><p>Ubicación GPS, mapa en vivo, sensores del teléfono y archivos JSON.</p></div>
<IonCard><IonCardHeader><IonCardTitle>Mapa y seguimiento</IonCardTitle></IonCardHeader><IonCardContent>Consulta tu ubicación y dirección, graba una ruta y toma una foto con coordenadas.<IonButton expand="block" routerLink="/map"><IonIcon slot="start" icon={mapOutline}/>Abrir mapa</IonButton></IonCardContent></IonCard>
<IonCard><IonCardHeader><IonCardTitle>Historial</IonCardTitle></IonCardHeader><IonCardContent>Revisa las rutas guardadas en el dispositivo.<IonButton expand="block" fill="outline" routerLink="/history"><IonIcon slot="start" icon={timeOutline}/>Ver historial</IonButton></IonCardContent></IonCard>
<IonButton expand="block" fill="clear" routerLink="/settings"><IonIcon slot="start" icon={settingsOutline}/>Sensores y ajustes</IonButton>
</div></IonContent></IonPage>}
