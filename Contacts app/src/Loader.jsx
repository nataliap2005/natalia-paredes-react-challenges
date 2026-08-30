import { useEffect } from 'react';

function Loader({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      const datosIniciales = [
        { id: 1, nombre: 'Mariana', telefono: '3043127706' },
        { id: 2, nombre: 'David', telefono: '3103783477' }
      ];
      onFinish(datosIniciales);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return <p>Cargando contactos...</p>;
}

export default Loader;