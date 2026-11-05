import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
export interface Coordinate { lat:number; lng:number; accuracy?:number; at:string }
export interface Track {id:string; startedAt:string; endedAt:string; points:Coordinate[]; distanceMeters:number }
const FILENAME='geotracker-routes.json';
export async function loadTracks():Promise<Track[]> {
  try {
    const file=await Filesystem.readFile({path:FILENAME,directory:Directory.Data,encoding:Encoding.UTF8});
    const text=typeof file.data==='string'?file.data:await file.data.text();
    const value:unknown=JSON.parse(text);
    return Array.isArray(value)?value as Track[]:[];
  } catch(e) {
    const msg=String(e).toLowerCase();
    if(msg.includes('does not exist')||msg.includes('not found')||msg.includes('no such file')) return [];
    throw e;
  }
}
export async function saveTrack(track:Track):Promise<void> {
  const current=await loadTracks();
  await Filesystem.writeFile({path:FILENAME,directory:Directory.Data,encoding:Encoding.UTF8,data:JSON.stringify([track,...current],null,2)});
}
export async function deleteTrack(id:string):Promise<void> {
  const current=await loadTracks();
  await Filesystem.writeFile({path:FILENAME,directory:Directory.Data,encoding:Encoding.UTF8,data:JSON.stringify(current.filter(x=>x.id!==id),null,2)});
}
export function distanceMeters(a:Coordinate,b:Coordinate):number {
 const rad=Math.PI/180;const dlat=(b.lat-a.lat)*rad;const dlng=(b.lng-a.lng)*rad;
 const h=Math.sin(dlat/2)**2+Math.cos(a.lat*rad)*Math.cos(b.lat*rad)*Math.sin(dlng/2)**2;
 return 6371000*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));
}
