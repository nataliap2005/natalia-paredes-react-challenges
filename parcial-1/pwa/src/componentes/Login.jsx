import {useState} from "react";

function Login({onLogin}){
    const [usuario,setUsuario]=useState("");
    const [password,setPassword]=useState("");
    const [error,setError]=useState("");

    const iniciarSesion=(e)=>{
        e.preventDefault();

        if(usuario==="admin" && password==="123"){
            localStorage.setItem("logged","true");
            onLogin();
        }else{
            setError("Usuario o contraseña incorrectos");
        }
    };

    return(
        <div>
            <h2>Login MediClinic</h2>

            <form onSubmit={iniciarSesion}>
                <input
                    type="text"
                    placeholder="Usuario"
                    value={usuario}
                    onChange={(e)=>setUsuario(e.target.value)}
                />
                <br/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <br/>
                <button type="submit">Ingresar</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default Login;