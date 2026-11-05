import {useEffect,useState} from 'react';
import {Motion} from '@capacitor/motion';
export function useMotion(){
  const [moving,setMoving]=useState(false);
  const [supported,setSupported]=useState(true);
  useEffect(()=>{
    let disposed=false;let handle:{remove:()=>Promise<void>}|undefined;
    let lastMovingAt=0;
    void Motion.addListener('accel',event=>{
      const a=event.acceleration;
      // acceleration excluye gravedad si el sistema lo soporta.
      const magnitude=Math.hypot(a?.x??0,a?.y??0,a?.z??0);
      if(magnitude>0.9){lastMovingAt=Date.now();setMoving(true);}
      else if(Date.now()-lastMovingAt>2500)setMoving(false);
    }).then(h=>{if(disposed)void h.remove();else handle=h;}).catch(()=>{if(!disposed)setSupported(false);});
    return()=>{disposed=true;if(handle)void handle.remove();};
  },[]);
  return {moving,supported};
}
