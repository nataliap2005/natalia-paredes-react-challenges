import {useState} from "react";

function PacienteForm({onAgregar}){
    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [cc,setCc]=useState("");
    const [telefono,setTelefono]=useState("");
    const [error,setError]=useState("");

    const agregarPaciente=(e)=>{
        e.preventDefault();

        if(nombre==="" || apellido==="" || cc===""){
            setError("El nombre, apellido y CC (cédula) son obligatorios :)");
            return;
        }

        const nuevoPaciente={
            id:Date.now(),
            nombre:nombre,
            apellido:apellido,
            cc:cc,
            telefono:telefono
        };

        onAgregar(nuevoPaciente);

        setNombre("");
        setApellido("");
        setCc("");
        setTelefono("");
        setError("");
    };

    return(
        <div>
            <h2>Agregar paciente</h2>

            <form onSubmit={agregarPaciente}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    placeholder="Apellido"
                    value={apellido}
                    onChange={(e)=>setApellido(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    placeholder="CC"
                    value={cc}
                    onChange={(e)=>setCc(e.target.value)}
                />
                <br/>

                <input
                    type="text"
                    placeholder="Teléfono"
                    value={telefono}
                    onChange={(e)=>setTelefono(e.target.value)}
                />
                <br/>

                <button type="submit">Agregar paciente</button>
            </form>

            {error && <p>{error}</p>}
        </div>
    );
}

export default PacienteForm;