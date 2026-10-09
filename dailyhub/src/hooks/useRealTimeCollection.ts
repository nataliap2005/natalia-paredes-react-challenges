import { requireOnline } from './useNetwork';
import { useEffect, useState } from 'react';
import { ref, push, update, remove, onValue } from 'firebase/database';
import { realtimeDb } from '../firebase/config';
export type Task = {id:string;title:string;description:string;completed:boolean;userId:string};
export function useRealTimeCollection(userId?:string){
  const [items,setItems]=useState<Task[]>([]);const [error,setError]=useState('');
  useEffect(()=>{if(!userId){setItems([]);return;}
    const q=ref(realtimeDb,`tasks/${userId}`);
    return onValue(q,s=>{const data=s.val() as Record<string,Omit<Task,'id'>>|null;setItems(Object.entries(data||{}).map(([id,value])=>({id,...value})));setError('');},e=>setError(e.message));
  },[userId]);
  const add=async(title:string,description:string)=>{if(!userId)throw Error('Sin sesión');await requireOnline();await push(ref(realtimeDb,`tasks/${userId}`),{title,description,completed:false,userId});};
  const edit=async(id:string,changes:Partial<Pick<Task,'title'|'description'|'completed'>>)=>{await requireOnline();await update(ref(realtimeDb,`tasks/${userId}/${id}`),changes);};
  const del=async(id:string)=>{await requireOnline();await remove(ref(realtimeDb,`tasks/${userId}/${id}`));};
  return {items,error,add,edit,remove:del};
}
