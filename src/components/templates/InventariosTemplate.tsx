import { useState } from "react";
import { ListaInventarios } from "../organism/ListaInventarios";
import { FormularioInventario } from "../organism/FormularioInventario";
import { BotonSimple } from "../atoms/BotonSimple";
import type { InventariosDTO } from "../../types/Inventarios";

interface InventariosTemplateProps {
  onSubmit: (inventario: Omit<InventariosDTO, "productoStock">) => Promise<void>;
  onEliminar: (codigo: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  loadingEliminar: boolean;
  errorEliminar: string | null;
}

export function InventariosTemplate({
  onSubmit,
  onEliminar,
  loading,
  error,
  loadingEliminar,
  errorEliminar,
}: InventariosTemplateProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSubmit = async (inventario: Omit<InventariosDTO, "productoStock">) => {
    await onSubmit(inventario);
    setMostrarFormulario(false);
  };

  const handleEliminar = async (inventario: InventariosDTO) => {
    if (!confirm("¿Seguro que deseas eliminar este inventario?")) return;
    await onEliminar(inventario.codigo);
  };

  return (
    <div className="container mt-4">
      <h2>Inventario de Productos</h2>
      <p className="text-muted">Gestiona el catálogo de productos del almacén.</p>

      <div className="d-flex justify-content-end mb-3">
        <BotonSimple
          texto={mostrarFormulario ? "Ocultar Formulario" : "+ Nuevo Inventario"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        />
      </div>

      {mostrarFormulario && (
        <div className="mb-4">
          <FormularioInventario
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {(loading || loadingEliminar) && <p>Cargando...</p>}
      {(error || errorEliminar) && (
        <p className="text-danger">
          {error || errorEliminar}
        </p>
      )}

      <ListaInventarios onEliminar={handleEliminar} />
    </div>
  );
}

