import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db/db';
export function useDexie(ownerId?:string){
 const items=useLiveQuery(()=>ownerId?db.fruits.where('ownerId').equals(ownerId).toArray():Promise.resolve([]),[ownerId],[]);
 const add=(name:string,quantity:number)=>{if(!ownerId)throw Error('Sin sesión');return db.fruits.add({name,quantity,ownerId});};
 const edit=(id:number,name:string,quantity:number)=>db.fruits.update(id,{name,quantity});
 const remove=(id:number)=>db.fruits.delete(id);
 return {items:items??[],add,edit,remove};
}
