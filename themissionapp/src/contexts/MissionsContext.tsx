import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {useAuth} from './AuthContext';
import {cacheProgress,finishMission,localProgress,observeProgress} from '../services/missionService';
import {initialProgress,type Progress,type MissionId} from '../types/mission';
type MissionsState={progress:Progress;loading:boolean;error:string;complete:(id:MissionId)=>Promise<boolean>};
const Context=createContext<MissionsState>({progress:initialProgress(),loading:true,error:'',complete:async()=>false});
export function MissionsProvider({children}:{children:ReactNode}){
 const {user}=useAuth();const [progress,setProgress]=useState<Progress>(initialProgress());const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{
   if(!user){setProgress(initialProgress());setLoading(false);return;}
   setProgress(localProgress(user.uid));setLoading(true);setError('');
   const unsub=observeProgress(user.uid,value=>{setProgress(value);setLoading(false)},e=>{setError(e.message);setLoading(false)});
   return unsub;
 },[user]);
 async function complete(id:MissionId){
   if(!user)throw new Error('Inicia sesión.');
   const updated=await finishMission(user.uid,id);
   if(updated){const next={...progress,missions:{...progress.missions,[id]:true}};
     next.points=Object.values(next.missions).filter(Boolean).length*40;
     setProgress(next);cacheProgress(user.uid,next);
   }
   return updated;
 }
 return <Context.Provider value={{progress,loading,error,complete}}>{children}</Context.Provider>;
}
export const useMissions=()=>useContext(Context);
