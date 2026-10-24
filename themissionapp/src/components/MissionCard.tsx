import {IonItem,IonIcon,IonLabel,IonBadge,IonNote} from '@ionic/react';
import {cameraOutline,navigateOutline,handLeftOutline,checkmarkCircle,lockClosedOutline,chevronForwardOutline} from 'ionicons/icons';
import type {MissionId} from '../types/mission';
import {MISSION_POINTS} from '../types/mission';
const icons={photo:cameraOutline,movement:navigateOutline,stillness:handLeftOutline};
export default function MissionCard({id,title,description,completed,locked,href}:{id:MissionId;title:string;description:string;completed:boolean;locked:boolean;href:string}){
 return <IonItem button={!locked} routerLink={locked?undefined:href} detail={!locked} className="mission-item"><IonIcon slot="start" icon={completed?checkmarkCircle:locked?lockClosedOutline:icons[id]} color={completed?'success':locked?'medium':'primary'} />
 <IonLabel><h2>{title}</h2><p>{description}</p><IonNote color={completed?'success':'medium'}>{completed?'Completada':locked?'Bloqueada':'Pendiente'}</IonNote></IonLabel><IonBadge slot="end" color={completed?'success':'light'}>+{MISSION_POINTS[id]}</IonBadge>{!locked&&!completed&&<IonIcon icon={chevronForwardOutline} size="small" color="medium" slot="end" />}</IonItem>;
}
