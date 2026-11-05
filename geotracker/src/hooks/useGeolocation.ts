import {useCallback,useEffect,useRef,useState} from 'react';
import {Geolocation} from '@capacitor/geolocation';
import type {Coordinate,Track} from '../services/trackingStorage';
import {distanceMeters,saveTrack} from '../services/trackingStorage';
import {Haptics,ImpactStyle} from '@capacitor/haptics';
import {Device} from '@capacitor/device';

export function useGeolocation(){
  const watchId=useRef<string|null>(null);
  const startedAt=useRef('');
  const pointsRef=useRef<Coordinate[]>([]);
  const distanceRef=useRef(0);
  const trackingRef=useRef(false);
  const [position,setPosition]=useState<Coordinate|null>(null);
  const [path,setPath]=useState<Coordinate[]>([]);
  const [distance,setDistance]=useState(0);
  const [tracking,setTracking]=useState(false);
  const [error,setError]=useState('');
  const [status,setStatus]=useState('Listo para obtener tu ubicación.');

  const getCurrentLocation=useCallback(async()=>{
    setError('');
    try{
      const perm=await Geolocation.requestPermissions();
      if(perm.location!=='granted'&&perm.coarseLocation!=='granted')throw new Error('Concede el permiso de ubicación.');
      const p=await Geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:60000,maximumAge:0});
      const next={lat:p.coords.latitude,lng:p.coords.longitude,accuracy:p.coords.accuracy,at:new Date().toISOString()};
      setPosition(next);setStatus('Ubicación obtenida.');return next;
    }catch(e){setError(e instanceof Error?e.message:String(e));throw e;}
  },[]);

  const stopTracking=useCallback(async(save=true)=>{
    trackingRef.current=false;
    const id=watchId.current;watchId.current=null;
    if(id)await Geolocation.clearWatch({id}).catch(()=>{});
    setTracking(false);
    const all=pointsRef.current;
    if(save&&all.length){
      const track:Track={id:`${Date.now()}-${Math.random().toString(36).slice(2,8)}`,startedAt:startedAt.current,endedAt:new Date().toISOString(),points:[...all],distanceMeters:distanceRef.current};
      await saveTrack(track);setStatus('Recorrido guardado en historial (JSON).');
      return track;
    }
    setStatus('Seguimiento detenido.');
    return null;
  },[]);

  const startTracking=useCallback(async()=>{
    if(trackingRef.current)return;
    setError('');
    const battery=await Device.getBatteryInfo().catch(()=>null);
    if(battery?.batteryLevel!==undefined && battery.batteryLevel!==null && battery.batteryLevel<=0.15 && !battery.isCharging){
      setError('Batería baja (15 % o menos): carga el dispositivo antes de iniciar.');return;
    }
    let permission;
    try{permission=await Geolocation.requestPermissions();}catch(e){setError(String(e));return;}
    if(permission.location!=='granted'&&permission.coarseLocation!=='granted'){
      setError('Debes conceder el permiso de ubicación.');return;
    }
    trackingRef.current=true;startedAt.current=new Date().toISOString();
    pointsRef.current=[];distanceRef.current=0;setPath([]);setDistance(0);
    setTracking(true);setStatus('Buscando señal GPS. Mantén la pantalla encendida.');
    try{await Haptics.impact({style:ImpactStyle.Light});}catch{/* navegador */}
    try{
      const id=await Geolocation.watchPosition({enableHighAccuracy:true,timeout:60000,maximumAge:0},(p,gpsError)=>{
        if(!trackingRef.current)return;
        if(gpsError){setError(gpsError.message);return;}
        if(!p)return;
        setError('');
        const next:Coordinate={lat:p.coords.latitude,lng:p.coords.longitude,accuracy:p.coords.accuracy,at:new Date().toISOString()};
        setPosition(next);
        // Ignoramos puntos demasiado inexactos para que el mapa no dibuje saltos grandes.
        if(p.coords.accuracy>45){setStatus(`Esperando mejor GPS (±${Math.round(p.coords.accuracy)} m).`);return;}
        const old=pointsRef.current;
        if(old.length){
          const step=distanceMeters(old[old.length-1],next);
          if(step<2)return;
          if(step>100){setStatus('Se descartó un salto de GPS de más de 100 m.');return;}
          distanceRef.current+=step;setDistance(distanceRef.current);
        }
        const updated=[...old,next];pointsRef.current=updated;setPath(updated);
        setStatus(`Grabando recorrido (${updated.length} puntos).`);
      });
      if(!trackingRef.current){await Geolocation.clearWatch({id});return;}
      watchId.current=id;
    }catch(e){setError(e instanceof Error?e.message:String(e));trackingRef.current=false;setTracking(false);}
  },[]);

  useEffect(()=>()=>{trackingRef.current=false;if(watchId.current)void Geolocation.clearWatch({id:watchId.current});},[]);
  return {position,path,distance,tracking,error,status,getCurrentLocation,startTracking,stopTracking};
}
