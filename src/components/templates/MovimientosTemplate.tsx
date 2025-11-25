import { useState } from "react";
import { ListaMovimientos } from "../organism/ListaMovimientos";
import { FormularioMovimiento } from "../organism/FormularioMovimiento";
import { BotonSimple } from "../atoms/BotonSimple";
import { ListaCargasPendientes } from "../organism/ListaCargasPendientes";
import type { MovimientosInventariosDTO } from "../../types/MovimientosInventarios";

interface MovimientosTemplateProps {
  onSubmit: (movimiento: Omit<MovimientosInventariosDTO, "fecha">) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export function MovimientosTemplate({
  onSubmit,
  loading,
  error,
}: MovimientosTemplateProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [recargarLista, setRecargarLista] = useState(0);

  const handleSubmit = async (movimiento: Omit<MovimientosInventariosDTO, "fecha">) => {
    try {
      await onSubmit(movimiento);
      setMostrarFormulario(false);
      setRecargarLista(prev => prev + 1);
    } catch (err) {
      // Error ya manejado en los hooks
    }
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Movimientos</h2>
      <p className="text-muted">Administra los movimientos de productos del almacén.</p>

      <div className="d-flex justify-content-end mb-3">
        <BotonSimple
          texto={mostrarFormulario ? "Ocultar Formulario" : "+ Nuevo Movimiento"}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        />
      </div>

      {mostrarFormulario && (
        <div className="mb-4">
          <FormularioMovimiento
            onSubmit={handleSubmit}
          />
        </div>
      )}

      {loading && <p>Cargando...</p>}
      {error && <p className="text-danger">Error: {error}</p>}

      <ListaCargasPendientes />

      <ListaMovimientos recargar={recargarLista} />
    </div>
  );
}

