import {useEffect,useState} from 'react';
import {Network,type ConnectionStatus} from '@capacitor/network';
export function useNetwork(){
  const [status,setStatus]=useState<ConnectionStatus|null>(null);
  useEffect(()=>{
    let disposed=false;let handle:{remove:()=>Promise<void>}|undefined;
    void Network.getStatus().then(s=>{if(!disposed)setStatus(s);}).catch(()=>{});
    void Network.addListener('networkStatusChange',s=>{if(!disposed)setStatus(s);}).then(h=>{if(disposed)void h.remove();else handle=h;}).catch(()=>{});
    return()=>{disposed=true;if(handle)void handle.remove();};
  },[]);
  return {connected:status?.connected??navigator.onLine,connectionType:status?.connectionType??'unknown'};
}
