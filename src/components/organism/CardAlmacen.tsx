import type { AlmacenesDTO } from "../../types/Almacenes";

interface CardAlmacenProps {
  almacen: AlmacenesDTO;
}

export function CardAlmacen(props: CardAlmacenProps) {
  const { almacen } = props;
  
  // Calcular espacio ocupado (cantidadDisponible es el espacio libre)
  const espacioOcupado = almacen.capacidadMaxima - almacen.cantidadDisponible;
  
  // Calcular porcentaje de ocupación
  const porcentajeOcupacion = almacen.capacidadMaxima > 0 
    ? (espacioOcupado / almacen.capacidadMaxima) * 100 
    : 0;
  
  // Espacio disponible es cantidadDisponible
  const espacioDisponible = almacen.cantidadDisponible;
  
  // Determinar color según el porcentaje de ocupación
  const getProgressColor = () => {
    if (porcentajeOcupacion >= 90) return "danger";
    if (porcentajeOcupacion >= 70) return "warning";
    return "success";
  };

  return (
    <>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            <i className="bi bi-warehouse me-2"></i>
            {almacen.nombre}
          </h4>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Código:</strong> {almacen.codigo}
              </p>
              <p className="mb-2">
                <strong>Código Sucursal:</strong> {almacen.codigoSucursal}
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2">
                <strong>Capacidad Máxima:</strong> {almacen.capacidadMaxima.toLocaleString()}
              </p>
              <p className="mb-2">
                <strong>Cantidad Disponible:</strong> {almacen.cantidadDisponible.toLocaleString()}
              </p>
            </div>
          </div>
          
          <hr />
          
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span><strong>Ocupación del Almacén</strong></span>
              <span className={`badge bg-${getProgressColor()}`}>
                {porcentajeOcupacion.toFixed(1)}%
              </span>
            </div>
            <div className="progress" style={{ height: "25px" }}>
              <div
                className={`progress-bar bg-${getProgressColor()}`}
                role="progressbar"
                style={{ width: `${porcentajeOcupacion}%` }}
                aria-valuenow={porcentajeOcupacion}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                {porcentajeOcupacion.toFixed(1)}%
              </div>
            </div>
          </div>
          
          <div className="row text-center mt-4">
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <h5 className="text-primary mb-1">{almacen.capacidadMaxima.toLocaleString()}</h5>
                <small className="text-muted">Capacidad Total</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <h5 className="text-success mb-1">{espacioOcupado.toLocaleString()}</h5>
                <small className="text-muted">En Uso</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 bg-light rounded">
                <h5 className="text-info mb-1">{espacioDisponible.toLocaleString()}</h5>
                <small className="text-muted">Espacio Libre</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

