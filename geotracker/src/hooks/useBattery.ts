import {useCallback,useEffect,useState} from 'react';
import {Device,type BatteryInfo} from '@capacitor/device';
export function useBattery(){
 const [battery,setBattery]=useState<BatteryInfo|null>(null);
 const refresh=useCallback(async()=>{try{setBattery(await Device.getBatteryInfo());}catch{setBattery(null);}},[]);
 useEffect(()=>{void refresh();},[refresh]);
 return {battery,refresh};
}
