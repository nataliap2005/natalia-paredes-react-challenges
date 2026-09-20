import {createContext,useContext,type ReactNode} from "react";
import type {User} from "firebase/auth";
import {useFirebaseAuth} from "../hooks/useFirebaseAuth";

interface AuthContextValue{
  user:User|null;
  loading:boolean;
  login:(email:string,password:string)=>Promise<void>;
  register:(email:string,password:string)=>Promise<void>;
  logout:()=>Promise<void>;
}

const AuthContext=createContext<AuthContextValue|undefined>(undefined);

export function AuthProvider({children}:{children:ReactNode}){
  const auth=useFirebaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth():AuthContextValue{
  const context=useContext(AuthContext);
  if(!context)throw new Error("useAuth debe usarse dentro de AuthProvider");
  return context;
}
