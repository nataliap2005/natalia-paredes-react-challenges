import {useState} from 'react';
import {Camera,CameraResultType,CameraSource} from '@capacitor/camera';
import {Directory,Filesystem} from '@capacitor/filesystem';
export function useCameraMission(){
 const [preview,setPreview]=useState('');const [busy,setBusy]=useState(false);
 async function capture(uid:string){
  setBusy(true);
  try{
   const photo=await Camera.getPhoto({quality:75,source:CameraSource.Camera,resultType:CameraResultType.Base64,correctOrientation:true});
   if(!photo.base64String)throw new Error('No se recibió la imagen de la cámara.');
   const filename=`evidencia-${uid}.jpeg`;
   await Filesystem.writeFile({path:filename,data:photo.base64String,directory:Directory.Data,recursive:true});
   setPreview(`data:image/jpeg;base64,${photo.base64String}`);
   return filename;
  }finally{setBusy(false)}
 }
 async function restore(uid:string){
  try{const file=await Filesystem.readFile({path:`evidencia-${uid}.jpeg`,directory:Directory.Data});
   if(typeof file.data==='string')setPreview(`data:image/jpeg;base64,${file.data}`);
  }catch{/* no previous image */}
 }
 return {capture,restore,preview,busy};
}
