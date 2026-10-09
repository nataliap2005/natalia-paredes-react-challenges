import { IonChip, IonLabel } from '@ionic/react';
export function Status({isOnline}:{isOnline:boolean}){return <IonChip color={isOnline?'success':'danger'}><IonLabel>{isOnline?'Con conexión':'Sin conexión · Contactos y Tareas bloqueados'}</IonLabel></IonChip>;}
