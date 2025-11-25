import type { LotesDTO } from "../../types/Lotes";

interface CardLoteProps {
  lote: LotesDTO;
  onEditar?: (lote: LotesDTO) => void;
  onEliminar?: (lote: LotesDTO) => void;
}

export function CardLote(props: CardLoteProps) {
  const { lote, onEditar, onEliminar } = props;
  
  const formatearFecha = (fecha: Date | string) => {
    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toLocaleDateString('es-ES');
  };

  return (
    <>
      <div className="card" style={{ width: "18rem" }}>
        <h5 className="card-header">
          Lote: {lote.codigo}
        </h5>
        <div className="card-body">
          <p className="card-text">
            <strong>Código Producto:</strong> {lote.codigoProducto}
          </p>
          <p className="card-text">
            <strong>Código Almacén:</strong> {lote.codigoAlmacen}
          </p>
          <p className="card-text">
            <strong>Cantidad:</strong> {lote.cantidad}
          </p>
          <p className="card-text">
            <strong>Fecha Ingreso:</strong> {formatearFecha(lote.fechaIngreso)}
          </p>
          <p className="card-text">
            <strong>Fecha Vencimiento:</strong> {formatearFecha(lote.fechaVencimiento)}
          </p>
          {(onEditar || onEliminar) && (
            <div className="d-flex justify-content-end gap-2 mt-3">
              {onEditar && (
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEditar(lote)}
                >
                  Editar
                </button>
              )}
              {onEliminar && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onEliminar(lote)}
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

