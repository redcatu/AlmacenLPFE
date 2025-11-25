import { useEffect } from "react";
import { useInventarios } from "../../hooks/useInventarios";
import { CardInventario } from "./CardInventario";
import type { InventariosDTO } from "../../types/Inventarios";

interface ListaInventariosProps {
  onEditar?: (inventario: InventariosDTO) => void;
  onEliminar?: (inventario: InventariosDTO) => void;
  recargar?: number;
}

export function ListaInventarios({ onEditar, onEliminar, recargar }: ListaInventariosProps) {
  const { inventarios, loading, error, recargar: recargarInventarios } = useInventarios();
  
  useEffect(() => {
    if (recargar !== undefined) {
      recargarInventarios();
    }
  }, [recargar, recargarInventarios]);
  
  if (loading) return <div>Cargando inventarios...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!inventarios.length) return <div>No hay inventarios</div>;
  return (
    <>
      <div className="row justify-content-center">
        {inventarios.map((inv) => (
          <div key={inv.codigo} className="col-md-4 mb-3">
            <CardInventario 
              inventario={inv} 
              onEditar={onEditar} 
              onEliminar={onEliminar}
            />
          </div>
        ))}
      </div>
    </>
  );
}

