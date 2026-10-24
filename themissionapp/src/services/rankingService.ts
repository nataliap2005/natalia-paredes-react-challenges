import {collection,limit,onSnapshot,orderBy,query,type Unsubscribe} from 'firebase/firestore';
import {db} from '../firebase';
import type {Profile} from '../types/mission';
export type RankingEntry=Profile & {uid:string};
export function subscribeRanking(onData:(rows:RankingEntry[])=>void,onError:(error:Error)=>void):Unsubscribe{
 return onSnapshot(query(collection(db,'mission_users'),orderBy('points','desc'),limit(5)),snapshot=>{
  onData(snapshot.docs.map(doc=>({uid:doc.id,...doc.data() as Profile})));
 },onError);
}
