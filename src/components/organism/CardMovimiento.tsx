import type { MovimientosInventariosDTO } from "../../types/MovimientosInventarios";

interface CardMovimientoProps {
  movimiento: MovimientosInventariosDTO;
  onEditar?: (movimiento: MovimientosInventariosDTO) => void;
  onEliminar?: (movimiento: MovimientosInventariosDTO) => void;
}

export function CardMovimiento(props: CardMovimientoProps) {
  const { movimiento, onEditar, onEliminar } = props;
  
  const formatearFecha = (fecha: Date | string) => {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toLocaleDateString('es-ES');
  };

  const getBadgeClass = (tipo: string) => {
    switch (tipo) {
      case "Entrada":
        return "bg-success";
      case "Salida":
        return "bg-danger";
      case "Devuelto":
        return "bg-warning";
      default:
        return "bg-secondary";
    }
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <h5 className="card-header d-flex justify-content-between align-items-center">
          <span>Movimiento: {movimiento.codigo}</span>
          <span className={`badge ${getBadgeClass(movimiento.tipoMovimiento)}`}>
            {movimiento.tipoMovimiento}
          </span>
        </h5>
        <div className="card-body">
          <p className="card-text">
            <strong>Código Producto:</strong> {movimiento.codigoProducto}
          </p>
          <p className="card-text">
            <strong>Código Camión:</strong> {movimiento.codigoCamion}
          </p>
          <p className="card-text">
            <strong>Código Almacén:</strong> {movimiento.codigoAlmacen}
          </p>
          <p className="card-text">
            <strong>Código Venta:</strong> {movimiento.codigoVenta}
          </p>
          {movimiento.codigoLote && (
            <p className="card-text">
              <strong>Código Lote:</strong> {movimiento.codigoLote}
            </p>
          )}
          <p className="card-text">
            <strong>Cantidad Buena:</strong> {movimiento.cantidadBuena}
          </p>
          {movimiento.cantidadMala > 0 && (
            <p className="card-text">
              <strong>Cantidad Mala:</strong> {movimiento.cantidadMala}
            </p>
          )}
          <p className="card-text">
            <strong>Fecha:</strong> {formatearFecha(movimiento.fecha)}
          </p>
          {movimiento.motivo && (
            <p className="card-text">
              <strong>Motivo:</strong> {movimiento.motivo}
            </p>
          )}
          {(onEditar || onEliminar) && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              {onEditar && (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEditar(movimiento)}
                >
                  Editar
                </button>
              )}
              {onEliminar && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(movimiento)}
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
