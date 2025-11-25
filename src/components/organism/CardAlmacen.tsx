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
      <div className="card dashboard-card">
        <div className="card-header dashboard-header">
          <h4 className="mb-0 dashboard-title">
            {almacen.nombre.toUpperCase()}
          </h4>
        </div>
        <div className="card-body dashboard-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <p className="mb-2 dashboard-info">
                <strong>Código:</strong> {almacen.codigo}
              </p>
              <p className="mb-2 dashboard-info">
                <strong>Código Sucursal:</strong> {almacen.codigoSucursal}
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2 dashboard-info">
                <strong>Capacidad Máxima:</strong> {almacen.capacidadMaxima.toLocaleString()}
              </p>
              <p className="mb-2 dashboard-info">
                <strong>Cantidad Disponible:</strong> {almacen.cantidadDisponible.toLocaleString()}
              </p>
            </div>
          </div>
          
          <hr className="dashboard-divider" />
          
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="dashboard-label"><strong>Ocupación del Almacén</strong></span>
              <span className="badge dashboard-badge-success">
                {porcentajeOcupacion.toFixed(1)}%
              </span>
            </div>
            <div className="progress dashboard-progress">
              <div
                className="progress-bar dashboard-progress-bar"
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
              <div className="dashboard-summary-card">
                <h5 className="dashboard-summary-number dashboard-purple">{almacen.capacidadMaxima.toLocaleString()}</h5>
                <small className="dashboard-summary-label">Capacidad Total</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard-summary-card">
                <h5 className="dashboard-summary-number dashboard-green">{espacioOcupado.toLocaleString()}</h5>
                <small className="dashboard-summary-label">En Uso</small>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard-summary-card">
                <h5 className="dashboard-summary-number dashboard-purple-light">{espacioDisponible.toLocaleString()}</h5>
                <small className="dashboard-summary-label">Espacio Libre</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

