import {LocalNotifications} from '@capacitor/local-notifications';
import {Capacitor} from '@capacitor/core';
export function useLocalNotifications(){
 async function notify(title:string,body:string){
  if(!Capacitor.isNativePlatform())return;
  const permission=await LocalNotifications.requestPermissions();
  if(permission.display!=='granted')return;
  await LocalNotifications.schedule({notifications:[{id:Math.floor(Math.random()*1000000000),title,body,schedule:{at:new Date(Date.now()+500)}}]});
 }
 return {notify};
}
