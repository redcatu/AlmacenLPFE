import { useState } from "react";
import { ListaLotes } from "../organism/ListaLotes";
import { FormularioLote } from "../organism/FormularioLote";
import { BotonSimple } from "../atoms/BotonSimple";
import type { LotesDTO } from "../../types/Lotes";

interface LotesTemplateProps {
  onSubmit: (lote: Omit<LotesDTO, "fechaIngreso">) => Promise<void>;
  onEliminar: (codigo: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  loadingEliminar: boolean;
  errorEliminar: string | null;
}

export function LotesTemplate({
  onSubmit,
  onEliminar,
  loading,
  error,
  loadingEliminar,
  errorEliminar,
}: LotesTemplateProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleSubmit = async (lote: Omit<LotesDTO, "fechaIngreso">) => {
    await onSubmit(lote);
    setMostrarFormulario(false);
  };

  const handleEliminar = async (lote: LotesDTO) => {
    if (!confirm("¿Seguro que deseas eliminar este lote?")) return;
    await onEliminar(lote.codigo);
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Lotes</h2>
      <p className="text-muted">Administra los lotes de productos del almacén.</p>

      <div className="d-flex justify-content-end mb-3">
        <BotonSimple
          texto={mostrarFormulario ? "Ocultar Formulario" : "+ Nuevo Lote"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        />
      </div>

      {mostrarFormulario && (
        <div className="mb-4">
          <FormularioLote
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

      <ListaLotes onEliminar={handleEliminar} />
    </div>
  );
}

