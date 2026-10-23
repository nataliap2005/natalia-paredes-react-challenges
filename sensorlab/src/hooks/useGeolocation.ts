import { useEffect, useRef, useState } from 'react';
import { Geolocation, type Position } from '@capacitor/geolocation';
export function useGeolocation() {
 const [position,setPosition]=useState<Position|null>(null);
 const [tracking,setTracking]=useState(false);
 const [error,setError]=useState('');
 const watchId=useRef<string|null>(null);
 const current=async()=>{try{setError(''); const p=await Geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:12000});setPosition(p);}catch(e){setError(String(e));}};
 const start=async()=>{if(watchId.current)return;try{setError('');await Geolocation.requestPermissions();watchId.current=await Geolocation.watchPosition({enableHighAccuracy:true},(p,e)=>{if(e)setError(e.message);if(p)setPosition(p);});setTracking(true);}catch(e){setError(String(e));}};
 const stop=async()=>{if(watchId.current){await Geolocation.clearWatch({id:watchId.current});watchId.current=null;}setTracking(false);};
 useEffect(()=>()=>{if(watchId.current)void Geolocation.clearWatch({id:watchId.current});},[]);
 return {position,tracking,error,current,start,stop};
}
