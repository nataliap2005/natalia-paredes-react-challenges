function PacienteList({pacientes}){
    return(
        <div>
            <h2>Lista de pacientes</h2>

            {pacientes.length===0 ? (
                <p>No hay pacientes registrados</p>
            ) : (
                pacientes.map((paciente)=>(
                    <div key={paciente.id}>
                        <p>
                            {paciente.nombre} {paciente.apellido}
                        </p>
                        <p>CC: {paciente.cc}</p>
                        <p>Teléfono: {paciente.telefono}</p>
                        <hr/>
                    </div>
                ))
            )}
        </div>
    );
}

export default PacienteList;