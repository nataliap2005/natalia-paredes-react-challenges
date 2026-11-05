import { useEffect, useState, type FormEvent } from 'react';
import { IonButton, IonInput, IonText } from '@ionic/react';
export default function TaskForm({
  currentTitle,
  onSave,
  onCancel,
}: {
  currentTitle?: string;
  onSave: (titulo: string) => Promise<void>;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState(currentTitle ?? '');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    setTitle(currentTitle ?? '');
    setError('');
  }, [currentTitle]);
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setBusy(true);
    setError('');
    try {
      await onSave(title.trim());
      setTitle('');
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="task-form">
      <IonInput
        label={currentTitle === undefined ? 'Nueva tarea' : 'Editar tarea'}
        labelPlacement="stacked"
        fill="outline"
        placeholder="¿Qué necesitas hacer?"
        maxlength={160}
        required
        value={title}
        onIonInput={(e) => setTitle(e.detail.value ?? '')}
      />
      <div className="form-actions">
        <IonButton type="submit" disabled={busy || !title.trim()}>
          {busy ? 'Guardando...' : currentTitle === undefined ? 'Agregar tarea' : 'Guardar cambios'}
        </IonButton>
        {onCancel && (
          <IonButton fill="outline" color="medium" type="button" onClick={onCancel}>
            Cancelar
          </IonButton>
        )}
      </div>
      {error && (
        <IonText color="danger">
          <p>{error}</p>
        </IonText>
      )}
    </form>
  );
}
