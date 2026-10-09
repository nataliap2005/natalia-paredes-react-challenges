import { requireOnline } from './useNetwork';
import { useEffect, useState } from 'react';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, query, where, type DocumentData } from 'firebase/firestore';
import { firestore } from '../firebase/config';
export type Contact = {id:string;name:string;phone:string;userId:string};
export function useCollection(userId?:string){
  const [items,setItems]=useState<Contact[]>([]);const [error,setError]=useState('');
  useEffect(()=>{if(!userId){setItems([]);return;}
    const q=query(collection(firestore,'contacts'),where('userId','==',userId));
    return onSnapshot(q,s=>{setItems(s.docs.map(d=>({...(d.data() as DocumentData),id:d.id} as Contact)));setError('');},e=>setError(e.message));
  },[userId]);
  const add=async(name:string,phone:string)=>{if(!userId)throw Error('Sin sesión');await requireOnline();await addDoc(collection(firestore,'contacts'),{name,phone,userId});};
  const update=async(id:string,name:string,phone:string)=>{await requireOnline();await updateDoc(doc(firestore,'contacts',id),{name,phone});};
  const remove=async(id:string)=>{await requireOnline();await deleteDoc(doc(firestore,'contacts',id));};
  return {items,error,add,update,remove};
}
