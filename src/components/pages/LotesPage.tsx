import { LotesTemplate } from "../templates/LotesTemplate";
import { useAgregarLote } from "../../hooks/useAgregarLote";
import { useEliminarLote } from "../../hooks/useEliminarLote";

export function LotesPage() {
  const { agregarLote, loading, error } = useAgregarLote();
  const { eliminarLote, loading: loadingEliminar, error: errorEliminar } = useEliminarLote();
  
  return (
    <LotesTemplate
      onSubmit={agregarLote}
      onEliminar={eliminarLote}
      loading={loading}
      error={error}
      loadingEliminar={loadingEliminar}
      errorEliminar={errorEliminar}
    />
  );
}

