import {useEffect,useState} from "react";
import Login from "./componentes/Login";
import PacienteForm from "./componentes/PacienteForm";
import PacienteList from "./componentes/PacienteList";

function App(){
    const [logged,setLogged]=useState(false);
    const [pacientes,setPacientes]=useState([]);
    const [busqueda,setBusqueda]=useState("");

    useEffect(()=>{
        const sesion=localStorage.getItem("logged");

        if(sesion==="true"){
            setLogged(true);
        }
    },[]);

    useEffect(()=>{
        const datos=localStorage.getItem("pacientes");

        if(datos){
            setPacientes(JSON.parse(datos));
        }
    },[]);

    const cerrarSesion=()=>{
        localStorage.removeItem("logged");
        setLogged(false);
    };

    const agregarPaciente=(nuevoPaciente)=>{
        const nuevos=[...pacientes,nuevoPaciente];
        setPacientes(nuevos);
        localStorage.setItem("pacientes",JSON.stringify(nuevos));
    };

    const pacientesFiltrados=pacientes.filter((paciente)=>{
        return (
            paciente.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            paciente.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
            paciente.cc.includes(busqueda)
        );
    });

    if(!logged){
        return <Login onLogin={()=>setLogged(true)}/>;
    }

    return(
        <div>
            <h1>MediClinic</h1>

            <button onClick={cerrarSesion}>
                Cerrar sesión
            </button>

            <h2>Buscar paciente</h2>

            <input
                type="text"
                placeholder="Buscar por nombre, apellido o CC"
                value={busqueda}
                onChange={(e)=>setBusqueda(e.target.value)}
            />

            <PacienteForm onAgregar={agregarPaciente}/>

            <br/>

            <PacienteList pacientes={pacientesFiltrados}/>
        </div>
    );
}

export default App;