import {useCallback,useEffect,useState} from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";
import {db} from "../firebase";
import type {Task,TaskChanges,TaskInput} from "../types/Task";

export function useFirebaseTasks(userId?:string){
  const [tasks,setTasks]=useState<Task[]>([]);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    if(!userId){
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const tasksQuery=query(collection(db,"tasks"),where("userId","==",userId));
    const unsubscribe=onSnapshot(tasksQuery,snapshot=>{
      const data=snapshot.docs.map(item=>({id:item.id,...item.data()} as Task));
      data.sort((a,b)=>(b.createdAt?.toMillis()||0)-(a.createdAt?.toMillis()||0));
      setTasks(data);
      setLoading(false);
    },error=>{
      console.error("Error al consultar tareas:",error);
      setLoading(false);
    });

    return unsubscribe;
  },[userId]);

  const addTask=async(task:TaskInput):Promise<string>=>{
    if(!userId)throw new Error("Usuario no autenticado");
    const reference=await addDoc(collection(db,"tasks"),{
      ...task,
      userId,
      createdAt:serverTimestamp()
    });
    return reference.id;
  };

  const updateTask=async(id:string,changes:TaskChanges):Promise<void>=>{
    await updateDoc(doc(db,"tasks",id),changes);
  };

  const deleteTask=async(id:string):Promise<void>=>{
    await deleteDoc(doc(db,"tasks",id));
  };

  const getTask=useCallback((id:string):Task|undefined=>tasks.find(task=>task.id===id),[tasks]);

  return {tasks,loading,addTask,updateTask,deleteTask,getTask};
}
