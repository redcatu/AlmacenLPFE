import { useAlmacen1 } from "../../hooks/useAlmacen1";
import { CardAlmacen } from "../organism/CardAlmacen";

export function DashboardPage() {
  const { almacen, loading, error } = useAlmacen1();

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-3">Cargando información del almacén...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error</h4>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!almacen) {
    return (
      <div className="container mt-4">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Almacén no encontrado</h4>
          <p>No se encontró información del almacén 1.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Dashboard</h2>
          <p className="text-muted">Vista general del almacén principal</p>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <CardAlmacen almacen={almacen} />
        </div>
      </div>
    </div>
  );
}

