import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {initializeFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDp9E_okLFudQQq_TyNFk9VLFO56F1eKdg",
  authDomain: "app-dev-mobiles.firebaseapp.com",
  projectId: "app-dev-mobiles",
  storageBucket: "app-dev-mobiles.firebasestorage.app",
  messagingSenderId: "445967100655",
  appId: "1:445967100655:web:54f3615b4ed8e23b79091a",
  measurementId: "G-9ZYWGX3ZJN"
};

const app=initializeApp(firebaseConfig);
const auth=getAuth(app);

const db=initializeFirestore(app,{
  experimentalAutoDetectLongPolling:false,
  experimentalForceLongPolling:true
});

export {app,auth,db};