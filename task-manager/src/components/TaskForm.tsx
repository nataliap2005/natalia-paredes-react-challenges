import { IonItem, IonInput, IonButton } from '@ionic/react';
import { useState } from 'react';

interface Props {
  onAddTarea: (texto: string) => void;
}

function TaskForm({ onAddTarea }: Props) {
  const [texto, setTexto] = useState('');

  const handleSubmit = () => {
    if (!texto.trim()) return;
    onAddTarea(texto);
    setTexto('');
  };

  return (
    <IonItem>
      <IonInput
        placeholder="Nueva tarea"
        value={texto}
        onIonInput={e => setTexto(e.detail.value ?? '')}
      />
      <IonButton onClick={handleSubmit} slot="end">
        Agregar
      </IonButton>
    </IonItem>
  );
}

export default TaskForm;