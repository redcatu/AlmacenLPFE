import { InformacionProducto } from "../molecules/InformacionProducto";
import { CabeceraProducto } from "../molecules/CabeceraProducto";
import { PrecioProducto } from "../atoms/PrecioProducto";
import type { ProductoDTO } from "../../types/Producto";

interface CardProductoProps {
  producto: ProductoDTO;
  onEditar: (producto: ProductoDTO) => void;
  onEliminar: (producto: ProductoDTO) => void;
}

export function CardProducto(props: CardProductoProps) {
  const { producto, onEditar, onEliminar } = props;
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <h5 className="card-header">
          <CabeceraProducto
            titulo={producto.nombre}
            codigo={producto.codigo}
          ></CabeceraProducto>
        </h5>
        <div className="card-body">
          <p className="card-text">
            <InformacionProducto
              descripcion={producto.descripcion}
              unidad={producto.unidadMedida}
              marca={producto.marca}
            ></InformacionProducto>
          </p>
          <p className="card-text">
            <PrecioProducto precio={producto.precio}></PrecioProducto>
          </p>
          <div className="d-flex justify-content-end gap-2 mt-3">
            <button
              className="btn btn-sm btn-outline-primary"
              onClick={() => onEditar(producto)}
            >
              Editar
            </button>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => onEliminar(producto)}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
