import { useState, useEffect } from "react";
import type { ProductoDTO } from "../../types/Producto";
import { CampoFormulario } from "../molecules/CampoFormulario";
import { BotonSimple } from "../atoms/BotonSimple";
interface FormularioProductoProps {
  onSubmit: (producto: ProductoDTO) => void;
  productoInicial?: ProductoDTO;
  modoEdicion?: boolean;
  onCancel?: () => void;
}

export function FormularioProducto({ 
  onSubmit, 
  productoInicial, 
  modoEdicion = false,
  onCancel 
}: FormularioProductoProps) {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [unidadMedida, setUnidadMedida] = useState("");
  const [precio, setPrecio] = useState(0);
  const [marca, setMarca] = useState("");

  useEffect(() => {
    if (productoInicial) {
      setCodigo(productoInicial.codigo);
      setNombre(productoInicial.nombre);
      setDescripcion(productoInicial.descripcion);
      setUnidadMedida(productoInicial.unidadMedida);
      setPrecio(productoInicial.precio);
      setMarca(productoInicial.marca);
    }
  }, [productoInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoProducto: ProductoDTO = {
      codigo,
      nombre,
      descripcion,
      unidadMedida,
      precio,
      marca,
    };
    onSubmit(nuevoProducto);

    setCodigo("");
    setNombre("");
    setDescripcion("");
    setUnidadMedida("");
    setPrecio(0);
    setMarca("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <CampoFormulario
        texto="Codigo"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        disabled={modoEdicion}
      ></CampoFormulario>

      <CampoFormulario
        texto="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      ></CampoFormulario>

      <CampoFormulario
        texto="Descripcion"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      ></CampoFormulario>

      <CampoFormulario
        texto="Unidad de Medida"
        value={unidadMedida}
        onChange={(e) => setUnidadMedida(e.target.value)}
      ></CampoFormulario>

      <CampoFormulario
        texto="Precio"
        value={precio}
        onChange={(e) =>
          setPrecio(e.target.value === "" ? 0 : Number(e.target.value))
        }
      ></CampoFormulario>

      <CampoFormulario
        texto="Marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
      ></CampoFormulario>
      <div className="d-flex gap-2">
        <BotonSimple 
          type="submit" 
          texto={modoEdicion ? "Actualizar Producto" : "Agregar Producto"}
        />
        {modoEdicion && onCancel && (
          <button 
            className="btn btn-secondary" 
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
