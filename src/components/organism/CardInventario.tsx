import type { InventariosDTO } from "../../types/Inventarios";

interface CardInventarioProps {
  inventario: InventariosDTO;
  onEditar?: (inventario: InventariosDTO) => void;
  onEliminar?: (inventario: InventariosDTO) => void;
}

export function CardInventario(props: CardInventarioProps) {
  const { inventario, onEditar, onEliminar } = props;
  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <h5 className="card-header">
          Inventario: {inventario.codigo}
        </h5>
        <div className="card-body">
          <p className="card-text">
            <strong>Código Producto:</strong> {inventario.codigoProducto}
          </p>
          <p className="card-text">
            <strong>Código Almacén:</strong> {inventario.codigoAlmacen}
          </p>
          <p className="card-text">
            <strong>Código Lote:</strong> {inventario.codigoLote}
          </p>
          <p className="card-text">
            <strong>Stock:</strong> {inventario.productoStock}
          </p>
          {(onEditar || onEliminar) && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              {onEditar && (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEditar(inventario)}
                >
                  Editar
                </button>
              )}
              {onEliminar && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(inventario)}
                >
                  Eliminar
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

