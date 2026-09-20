import {useEffect,useState} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User
} from "firebase/auth";
import {auth} from "../firebase";

export function useFirebaseAuth(){
  const [user,setUser]=useState<User|null>(null);
  const [loading,setLoading]=useState<boolean>(true);

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,currentUser=>{
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe;
  },[]);

  const login=async(email:string,password:string):Promise<void>=>{
    await signInWithEmailAndPassword(auth,email,password);
  };

  const register=async(email:string,password:string):Promise<void>=>{
    await createUserWithEmailAndPassword(auth,email,password);
  };

  const logout=async():Promise<void>=>{
    await firebaseSignOut(auth);
  };

  return {user,loading,login,register,logout};
}
