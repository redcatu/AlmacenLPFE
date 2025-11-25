import { useEffect } from "react";
import { useMovimientos } from "../../hooks/useMovimientos";
import { CardMovimiento } from "./CardMovimiento";
import type { MovimientosInventariosDTO } from "../../types/MovimientosInventarios";

interface ListaMovimientosProps {
  onEditar?: (movimiento: MovimientosInventariosDTO) => void;
  onEliminar?: (movimiento: MovimientosInventariosDTO) => void;
  recargar?: number;
}

export function ListaMovimientos({ onEditar, onEliminar, recargar }: ListaMovimientosProps) {
  const { movimientos, loading, error, recargar: recargarMovimientos } = useMovimientos();
  
  useEffect(() => {
    if (recargar !== undefined) {
      recargarMovimientos();
    }
  }, [recargar, recargarMovimientos]);
  if (loading) return <div>Cargando movimientos...</div>;
  if (error && !error.includes("404")) {
    return <div className="text-danger">Error: {error}</div>;
  }
  if (!movimientos.length) {
    return (
      <div className="alert alert-info">
        {error && error.includes("404") 
          ? "El endpoint de Movimientos no está disponible en el servidor. Por favor, verifica que el endpoint esté implementado en el backend."
          : "No hay movimientos registrados"}
      </div>
    );
  }
  return (
    <>
      <div className="row justify-content-center">
        {movimientos.map((mov) => (
          <div key={mov.codigo} className="col-md-4 mb-3">
            <CardMovimiento 
              movimiento={mov} 
              onEditar={onEditar} 
              onEliminar={onEliminar}
            />
          </div>
        ))}
      </div>
    </>
  );
}

