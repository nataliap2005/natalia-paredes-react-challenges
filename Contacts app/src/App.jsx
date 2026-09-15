import {useState} from 'react';
import {Routes,Route,Navigate,useNavigate} from 'react-router-dom';
import Loader from './Loader';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Login from './Login';
import './App.css';

function App(){
  const [logged,setLogged]=useState(
    localStorage.getItem('logged')==='true'
  );

  const handleLogin=()=>{
    setLogged(true);
  };

  const handleLogout=()=>{
    localStorage.removeItem('logged');
    setLogged(false);
  };

  return(
    <Routes>
      <Route
        path="/login"
        element={
          logged
            ?<Navigate to="/contacts"/>
            :<Login onLogin={handleLogin}/>
        }
      />

      <Route
        path="/contacts"
        element={
          logged
            ?<Contacts onLogout={handleLogout}/>
            :<Navigate to="/login"/>
        }
      />

      <Route
        path="/"
        element={
          <Navigate to={logged?'/contacts':'/login'}/>
        }
      />

      <Route
        path="*"
        element={
          <Navigate to={logged?'/contacts':'/login'}/>
        }
      />
    </Routes>
  );
}

function Contacts({onLogout}){
  const [contactos,setContactos]=useState([]);
  const [loading,setLoading]=useState(true);

  const navigate=useNavigate();

  const addContacto=(nuevo)=>{
    setContactos(prev=>[
      ...prev,
      {id:Date.now(),...nuevo}
    ]);
  };

  const deleteContacto=(id)=>{
    setContactos(prev=>prev.filter(c=>c.id!==id));
  };

  const logout=()=>{
    onLogout();
    navigate('/login');
  };

  if(loading){
    return(
      <Loader
        onFinish={(iniciales)=>{
          setContactos(iniciales);
          setLoading(false);
        }}
      />
    );
  }

  return(
    <div className="contacts-container">

      <div className="header">
        <h1>Mis Contactos</h1>

        <button
          className="logout-button"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </div>

      <ContactForm onAddContact={addContacto}/>

      <ContactList
        contactos={contactos}
        onDelete={deleteContacto}
      />

    </div>
  );
}

export default App;