import {useState} from 'react';import {Filesystem,Directory,Encoding} from '@capacitor/filesystem';
export function useFilesystem(){const [content,setContent]=useState('');const [files,setFiles]=useState<string[]>([]);const [message,setMessage]=useState('');const [error,setError]=useState('');const [loading,setLoading]=useState(false);
 const perform=async(action:()=>Promise<void>)=>{setLoading(true);setError('');try{await action();}catch(e){setError(String(e));}finally{setLoading(false);}};
 const write=(text:string)=>perform(async()=>{await Filesystem.writeFile({path:'sensorlab-demo.txt',data:text,directory:Directory.Data,encoding:Encoding.UTF8});setMessage('Archivo guardado');});
 const read=()=>perform(async()=>{const r=await Filesystem.readFile({path:'sensorlab-demo.txt',directory:Directory.Data,encoding:Encoding.UTF8});setContent(typeof r.data==='string'?r.data:'Archivo binario');setMessage('Archivo leído');});
 const list=()=>perform(async()=>{const r=await Filesystem.readdir({path:'',directory:Directory.Data});setFiles(r.files.map(f=>f.name));setMessage('Archivos listados');});
 const remove=()=>perform(async()=>{await Filesystem.deleteFile({path:'sensorlab-demo.txt',directory:Directory.Data});setContent('');setMessage('Archivo eliminado');});
 return {write,read,list,remove,content,files,message,error,loading};}
