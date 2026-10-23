import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
export function useCamera(){const [photo,setPhoto]=useState<string|null>(null);const [error,setError]=useState('');
 const capture=async(source:CameraSource)=>{try{setError('');const image=await Camera.getPhoto({quality:80,allowEditing:false,resultType:CameraResultType.Uri,source});setPhoto(image.webPath??null);}catch(e){setError(String(e));}};
 return {photo,error,capture};}
