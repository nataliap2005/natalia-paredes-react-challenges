import {useState} from 'react';

function ContactForm({onAddContact}){
  const [nombre,setNombre]=useState('');
  const [telefono,setTelefono]=useState('');

  const handleSubmit=()=>{
    if(!nombre||!telefono)return;

    onAddContact({
      nombre,
      telefono
    });

    setNombre('');
    setTelefono('');
  };

  return(
    <div className="contact-form">
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={e=>setNombre(e.target.value)}
      />

      <input
        placeholder="Teléfono"
        value={telefono}
        onChange={e=>setTelefono(e.target.value)}
      />

      <button onClick={handleSubmit}>
        Agregar
      </button>
    </div>
  );
}

export default ContactForm;