import { useEffect, useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { arrowBackOutline, cameraOutline, logOutOutline } from 'ionicons/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCamera } from '../hooks/useCamera';
import { getAvatarUrl, uploadAvatar } from '../services/avatarService';
export default function Profile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const cam = useCamera();
  const [avatar, setAvatar] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (!user) return;
    let live = true;
    void getAvatarUrl(user.id)
      .then((url) => {
        if (live) setAvatar(url);
      })
      .catch((e) => {
        if (live && !/not found/i.test(String(e))) console.warn(e);
      });
    return () => {
      live = false;
    };
  }, [user]);
  async function savePhoto() {
    if (!user) return;
    const photo = await cam.capture();
    if (!photo) return;
    setBusy(true);
    setError('');
    setMessage('');
    try {
      await uploadAvatar(user.id, photo);
      setAvatar(await getAvatarUrl(user.id));
      setMessage('Fotografía guardada en Supabase Storage.');
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }
  async function logout() {
    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (e) {
      setError(String(e));
    }
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton slot="start" fill="clear" onClick={() => navigate('/home')} aria-label="Volver">
            <IonIcon icon={arrowBackOutline} />
          </IonButton>
          <IonTitle>Mi perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="page-container profile-content">
          <h1>Mi perfil</h1>
          <div className="avatar-frame">
            {cam.preview || avatar ? (
              <img src={cam.preview ?? avatar ?? ''} alt="Fotografía del perfil" />
            ) : (
              <IonIcon icon={cameraOutline} />
            )}
          </div>
          <h2>{user?.user_metadata?.name || user?.email?.split('@')[0]}</h2>
          <p>{user?.email}</p>
          <IonButton expand="block" disabled={busy || cam.busy} onClick={() => void savePhoto()}>
            <IonIcon slot="start" icon={cameraOutline} />
            {busy ? 'Subiendo...' : 'Tomar foto y subir avatar'}
          </IonButton>
          {(busy || cam.busy) && <IonSpinner />}
          {(error || cam.error) && (
            <IonText color="danger">
              <p>{error || cam.error}</p>
            </IonText>
          )}
          {message && (
            <IonText color="success">
              <p>{message}</p>
            </IonText>
          )}
          <p className="hint">La fotografía se guarda en el bucket privado avatars, dentro de tu carpeta personal.</p>
          <IonButton expand="block" color="medium" fill="outline" onClick={() => void logout()}>
            <IonIcon slot="start" icon={logOutOutline} />
            Cerrar sesión
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
