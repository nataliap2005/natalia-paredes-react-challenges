import {doc,getDoc,runTransaction,serverTimestamp,onSnapshot,type Unsubscribe} from 'firebase/firestore';
import {db} from '../firebase';
import {initialProgress,MISSION_POINTS,type MissionId,type Progress} from '../types/mission';
const localKey=(uid:string)=>`themissionapp:progress:${uid}`;
export function localProgress(uid:string):Progress{
 try {const raw=localStorage.getItem(localKey(uid));if(raw){const value=JSON.parse(raw) as Progress;return {...initialProgress(),...value,missions:{...initialProgress().missions,...value.missions}}}} catch { /* ignore corrupt cache */ }
 return initialProgress();
}
export function cacheProgress(uid:string,progress:Progress){localStorage.setItem(localKey(uid),JSON.stringify(progress));}
export function observeProgress(uid:string,onData:(progress:Progress)=>void,onError:(error:Error)=>void):Unsubscribe {
 return onSnapshot(doc(db,'mission_progress',uid),snap=>{
   const progress=snap.exists()?snap.data() as Progress:initialProgress();cacheProgress(uid,progress);onData(progress);
 },error=>onError(error));
}
/** Firestore transaction prevents repeated rewards on this client. For untrusted clients,
 * strong anti-cheat requires server-side validation (Cloud Functions). */
export async function finishMission(uid:string,id:MissionId):Promise<boolean>{
 const ref=doc(db,'mission_progress',uid);const profile=doc(db,'mission_users',uid);
 const completed=await runTransaction(db,async tx=>{
   const progressSnap=await tx.get(ref);const profileSnap=await tx.get(profile);
   const current=progressSnap.exists()?progressSnap.data() as Progress:initialProgress();
   if(current.missions[id])return false;
   if(id==='stillness' && !current.missions.movement)throw new Error('Primero completa la misión de movimiento.');
   const missions={...current.missions,[id]:true};
   const points=Object.entries(missions).reduce((total,[key,done])=>total+(done?MISSION_POINTS[key as MissionId]:0),0);
   tx.set(ref,{points,missions,updatedAt:serverTimestamp()},{merge:true});
   tx.set(profile,{points,updatedAt:serverTimestamp(), ...(profileSnap.exists()?{}:{displayName:'Participante',email:''})},{merge:true});
   return true;
 });
 if(completed){const snap=await getDoc(ref);if(snap.exists())cacheProgress(uid,snap.data() as Progress);}
 return completed;
}
