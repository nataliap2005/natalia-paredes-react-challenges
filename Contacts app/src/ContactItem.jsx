function ContactItem({ contacto, onDelete }) {
  return (
    <li>
      {contacto.nombre} - {contacto.telefono}
      <button onClick={() => onDelete(contacto.id)}>Eliminar</button>
    </li>
  );
}

export default ContactItem;