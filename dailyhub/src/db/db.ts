import Dexie, { type EntityTable } from 'dexie';
export interface Fruit {id:number;name:string;quantity:number;ownerId:string}
export const db=new Dexie('DailyHubDB') as Dexie & {fruits:EntityTable<Fruit,'id'>};
db.version(1).stores({fruits:'++id, name, ownerId'});
