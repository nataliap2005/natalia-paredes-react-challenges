import { useState } from 'react';
import Loader from './Loader';
import ContactForm from './ContactForm';
import ContactList from './ContactList.jsx';
import './App.css';

function App() {
  const [contactos, setContactos] = useState([]);
  const [loading, setLoading] = useState(true);

  const addContacto = (nuevo) => {
    setContactos(prev => [...prev, { id: Date.now(), ...nuevo }]);
  };

  const deleteContacto = (id) => {
    setContactos(prev => prev.filter(c => c.id !== id));
  };

  if (loading) {
    return <Loader onFinish={(iniciales) => { setContactos(iniciales); setLoading(false); }} />;
  }

  return (
    <>
      <h1>Mis Contactos</h1>
      <ContactForm onAddContact={addContacto} />
      <ContactList contactos={contactos} onDelete={deleteContacto} />
    </>
  );
}

export default App;