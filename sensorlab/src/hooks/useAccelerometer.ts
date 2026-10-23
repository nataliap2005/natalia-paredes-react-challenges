import { useEffect,useRef,useState } from 'react';
import { Motion } from '@capacitor/motion';
import type { PluginListenerHandle } from '@capacitor/core';
type Axis={x:number;y:number;z:number};
export function useAccelerometer(){const [acceleration,setAcceleration]=useState<Axis>({x:0,y:0,z:0});const [magnitude,setMagnitude]=useState(0);const [shaking,setShaking]=useState(false);const [running,setRunning]=useState(false);const [error,setError]=useState('');const listener=useRef<PluginListenerHandle|null>(null);const timeout=useRef<ReturnType<typeof setTimeout>|null>(null);
 const start=async()=>{if(listener.current)return;try{setError('');listener.current=await Motion.addListener('accel',e=>{const a=e.acceleration??e.accelerationIncludingGravity; if(!a)return;const x=a.x??0,y=a.y??0,z=a.z??0;setAcceleration({x,y,z});const value=Math.sqrt(x*x+y*y+z*z);setMagnitude(value);if(value>18){setShaking(true);if(timeout.current)clearTimeout(timeout.current);timeout.current=setTimeout(()=>setShaking(false),850);}});setRunning(true);}catch(e){setError(String(e));}};
 const stop=async()=>{if(listener.current){await listener.current.remove();listener.current=null;}setRunning(false);};
 useEffect(()=>()=>{void listener.current?.remove();if(timeout.current)clearTimeout(timeout.current);},[]);
 return {acceleration,magnitude,shaking,running,error,start,stop};}
