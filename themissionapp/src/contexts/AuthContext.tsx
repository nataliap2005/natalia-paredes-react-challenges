import {createContext,useContext,useEffect,useState,type ReactNode} from 'react';
import {onAuthStateChanged,type User} from 'firebase/auth';
import {auth} from '../firebase';
type AuthState={user:User|null;loading:boolean};
const Context=createContext<AuthState>({user:null,loading:true});
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);
 useEffect(()=>onAuthStateChanged(auth,next=>{setUser(next);setLoading(false)}),[]);
 return <Context.Provider value={{user,loading}}>{children}</Context.Provider>;
}
export const useAuth=()=>useContext(Context);
