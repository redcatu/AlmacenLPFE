import { useEffect, useState } from "react";

export function ConexionProductosGet() {
  const [datos, setDatos] = useState([]);
  useEffect(() => {
    const URL = "https://localhost:7072/api/Productos/Lista";
    fetch(URL)
      .then((respuesta) => respuesta.json())
      .then((datos) => setDatos(datos));
  }, []);
  return (
    <>
      <ul>
        {datos.map(() => {
          return <li>hola</li>;
        })}
      </ul>
    </>
  );
}
