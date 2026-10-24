import {useState,type FormEvent} from 'react';import {Navigate} from 'react-router-dom';
import {IonPage,IonContent,IonInput,IonButton,IonText} from '@ionic/react';
import {registerUser} from '../services/authService';import {useAuth} from '../contexts/AuthContext';
export default function Register(){const {user}=useAuth();const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 if(user)return <Navigate to="/home" replace/>;
 async function submit(e:FormEvent){e.preventDefault();if(name.trim().length<2){setError('Escribe tu nombre.');return;}if(password.length<6){setError('La contraseña debe tener al menos 6 caracteres.');return;}
 setBusy(true);setError('');try{await registerUser(name,email,password)}catch(err){setError(err instanceof Error?err.message:String(err))}finally{setBusy(false)}}
 return <IonPage><IonContent className="ion-padding"><div className="auth-screen"><h1>Crear cuenta</h1><p>Regístrate para comenzar a ganar puntos.</p>
 <form onSubmit={submit} className="auth-form"><IonInput label="Nombre" labelPlacement="stacked" fill="outline" required value={name} onIonInput={e=>setName(e.detail.value??'')}/>
 <IonInput label="Correo electrónico" labelPlacement="stacked" fill="outline" type="email" required value={email} onIonInput={e=>setEmail(e.detail.value??'')}/>
 <IonInput label="Contraseña" labelPlacement="stacked" fill="outline" type="password" required value={password} onIonInput={e=>setPassword(e.detail.value??'')}/>
 {error&&<IonText color="danger"><p className="error-text">{error}</p></IonText>}<IonButton type="submit" expand="block" disabled={busy}>{busy?'Creando cuenta...':'Registrarme'}</IonButton></form><p>¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p></div></IonContent></IonPage>;
}
