import { useState, type FormEvent } from 'react';
import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
export default function Login() {
  const { user, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  if (user) return <Navigate to="/home" replace />;
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await signIn(email, password);
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
          <IonTitle>TaskFlow</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="auth-container">
          <h1>Bienvenida de nuevo</h1>
          <p>Inicia sesión para administrar tus tareas.</p>
          <form onSubmit={submit} className="form-stack">
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
              label="Contraseña"
              labelPlacement="stacked"
              type="password"
              fill="outline"
              required
              value={password}
              onIonInput={(e) => setPassword(e.detail.value ?? '')}
            />
            {error && (
              <IonText color="danger">
                <p>{error}</p>
              </IonText>
            )}
            <IonButton type="submit" expand="block" disabled={busy}>
              {busy ? 'Ingresando...' : 'Iniciar sesión'}
            </IonButton>
          </form>
          <p>
            ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </IonContent>
    </IonPage>
  );
}
