import { useState } from 'react';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
export function useCamera() {
  const [file, setFile] = useState<Blob | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  async function capture() {
    setBusy(true);
    setError('');
    try {
      const photo = await Camera.getPhoto({
        quality: 75,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        correctOrientation: true,
      });
      if (!photo.webPath) throw new Error('No se obtuvo la fotografía.');
      const response = await fetch(photo.webPath);
      if (!response.ok) throw new Error('No se pudo leer la foto capturada.');
      const blob = await response.blob();
      setFile(blob);
      setPreview(photo.webPath);
      return blob;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return null;
    } finally {
      setBusy(false);
    }
  }
  return { file, preview, busy, error, capture };
}
