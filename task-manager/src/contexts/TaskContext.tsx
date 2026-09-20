import {createContext,useContext,type ReactNode} from "react";
import {useAuth} from "./AuthContext";
import {useFirebaseTasks} from "../hooks/useFirebaseTasks";
import type {Task,TaskChanges,TaskInput} from "../types/Task";

interface TaskContextValue{
  tasks:Task[];
  loading:boolean;
  addTask:(task:TaskInput)=>Promise<string>;
  updateTask:(id:string,changes:TaskChanges)=>Promise<void>;
  deleteTask:(id:string)=>Promise<void>;
  getTask:(id:string)=>Task|undefined;
}

const TaskContext=createContext<TaskContextValue|undefined>(undefined);

export function TaskProvider({children}:{children:ReactNode}){
  const {user}=useAuth();
  const tasks=useFirebaseTasks(user?.uid);
  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
}

export function useTasks():TaskContextValue{
  const context=useContext(TaskContext);
  if(!context)throw new Error("useTasks debe usarse dentro de TaskProvider");
  return context;
}
