import {IonPage,IonHeader,IonToolbar,IonTitle,IonContent,IonButtons,IonBackButton,IonButton,IonIcon} from '@ionic/react';
import {homeOutline} from 'ionicons/icons';import type {ReactNode} from 'react';
export default function PageShell({title,children,back=true}:{title:string;children:ReactNode;back?:boolean}){
 return <IonPage><IonHeader><IonToolbar>{back&&<IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>}<IonTitle>{title}</IonTitle>
 {back&&<IonButtons slot="end"><IonButton routerLink="/home"><IonIcon icon={homeOutline} /></IonButton></IonButtons>}</IonToolbar></IonHeader><IonContent className="ion-padding"><div className="page-body">{children}</div></IonContent></IonPage>;
}
