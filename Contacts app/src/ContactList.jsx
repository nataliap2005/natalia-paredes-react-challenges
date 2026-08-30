import ContactItem from './ContactItem';

function ContactList({ contactos, onDelete }) {
  return (
    <ul>
      {contactos.map(c => (
        <ContactItem key={c.id} contacto={c} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default ContactList;