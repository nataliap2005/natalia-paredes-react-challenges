import {useEffect,useRef,useState} from 'react';
import {Motion} from '@capacitor/motion';
import type {PluginListenerHandle} from '@capacitor/core';
const TIME_REQUIRED=10000;
export function useStillnessMission(){
 const listener=useRef<PluginListenerHandle|null>(null);const timer=useRef<ReturnType<typeof setInterval>|null>(null);
 const startAt=useRef(0);const base=useRef<{x:number;y:number;z:number}|null>(null);
 const [seconds,setSeconds]=useState(0);const [running,setRunning]=useState(false);const [ready,setReady]=useState(false);const [error,setError]=useState('');
 function cleanup(){if(timer.current){clearInterval(timer.current);timer.current=null;}if(listener.current){void listener.current.remove();listener.current=null;}setRunning(false);}
 async function start(){cleanup();setError('');setSeconds(0);setReady(false);base.current=null;startAt.current=0;
  try{
   listener.current=await Motion.addListener('accel',event=>{
     const a=event.accelerationIncludingGravity;if(a.x===null||a.y===null||a.z===null)return;
     const xyz={x:a.x,y:a.y,z:a.z};
     if(!base.current){base.current=xyz;startAt.current=Date.now();return;}
     const delta=Math.hypot(xyz.x-base.current.x,xyz.y-base.current.y,xyz.z-base.current.z);
     base.current=xyz;
     if(delta>0.55){startAt.current=Date.now();setSeconds(0);}
   });
   setRunning(true);
   timer.current=setInterval(()=>{
     if(!startAt.current)return;const passed=Date.now()-startAt.current;
     setSeconds(Math.min(10,Math.floor(passed/1000)));
     if(passed>=TIME_REQUIRED){setReady(true);cleanup();}
   },250);
  }catch(e){setError(e instanceof Error?e.message:String(e));cleanup();}
 }
 useEffect(()=>()=>cleanup(),[]);
 return {start,stop:cleanup,seconds,running,ready,error};
}
