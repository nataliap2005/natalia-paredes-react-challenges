import {useState,type FormEvent} from 'react';import {Navigate} from 'react-router-dom';
import {IonPage,IonContent,IonInput,IonButton,IonText,IonIcon} from '@ionic/react';import {flashOutline} from 'ionicons/icons';
import {loginUser} from '../services/authService';import {useAuth} from '../contexts/AuthContext';
export default function Login(){const {user}=useAuth();const [email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState('');
 if(user)return <Navigate to="/home" replace/>;
 async function submit(e:FormEvent){e.preventDefault();setBusy(true);setError('');try{await loginUser(email,password)}catch(err){setError(err instanceof Error?err.message:String(err))}finally{setBusy(false)}}
 return <IonPage><IonContent className="ion-padding"><div className="auth-screen"><div className="auth-logo"><IonIcon icon={flashOutline}/></div><h1>TheMissionApp</h1><p>Misiones reales. Puntos reales.</p>
 <form onSubmit={submit} className="auth-form"><IonInput label="Correo electrónico" labelPlacement="stacked" fill="outline" type="email" required value={email} onIonInput={e=>setEmail(e.detail.value??'')}/>
 <IonInput label="Contraseña" labelPlacement="stacked" fill="outline" type="password" required value={password} onIonInput={e=>setPassword(e.detail.value??'')}/>
 {error&&<IonText color="danger"><p className="error-text">{error}</p></IonText>}
 <IonButton type="submit" expand="block" disabled={busy}>{busy?'Ingresando...':'Iniciar sesión'}</IonButton></form><p>¿No tienes cuenta? <a href="/register">Regístrate</a></p></div></IonContent></IonPage>;
}
