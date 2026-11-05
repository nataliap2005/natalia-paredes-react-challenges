import { useState, type FormEvent } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Register() {
  const { user, signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  if (user) return <Navigate to="/home" replace />;
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    setMessage('');
    try {
      const loggedIn = await signUp(name, email, password);
      if (!loggedIn) setMessage('Cuenta creada. Revisa tu correo y confirma la cuenta antes de iniciar sesión.');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="auth-container">
          <h1>Comienza con TaskFlow</h1>
          <form onSubmit={submit} className="form-stack">
            <IonInput
              label="Nombre"
              labelPlacement="stacked"
              fill="outline"
              required
              value={name}
              onIonInput={(e) => setName(e.detail.value ?? '')}
            />
            <IonInput
              label="Correo electrónico"
              labelPlacement="stacked"
              type="email"
              fill="outline"
              required
              value={email}
              onIonInput={(e) => setEmail(e.detail.value ?? '')}
            />
            <IonInput
              label="Contraseña (mínimo 6 caracteres)"
              labelPlacement="stacked"
              type="password"
              fill="outline"
              required
              minlength={6}
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
            {error && (
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            )}
            {message && (
              <IonText color="success">
                <p>{message}</p>
              </IonText>
            )}
            <IonButton type="submit" expand="block" disabled={busy}>
              {busy ? 'Registrando...' : 'Crear cuenta'}
            </IonButton>
          </form>
          <p>
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
