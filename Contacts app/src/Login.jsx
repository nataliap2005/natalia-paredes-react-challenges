import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Login({onLogin}){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');

  const navigate=useNavigate();

  const handleLogin=()=>{
    if(email==='user@mail.com'&&password==='123'){
      localStorage.setItem('logged','true');
      onLogin();
      navigate('/contacts');
    }else{
      setError('Correo o contraseña incorrectos');
    }
  };

  return(
    <div className="login-container">
      <div className="login-card">
        <h1>Contacts App</h1>
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={e=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e=>setPassword(e.target.value)}
        />

        {error&&<p className="error">{error}</p>}

        <button onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}

export default Login;