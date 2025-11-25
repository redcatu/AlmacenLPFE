import { InventariosTemplate } from "../templates/InventariosTemplate";
import { useAgregarInventario } from "../../hooks/useAgregarInventario";
import { useEliminarInventario } from "../../hooks/useEliminarInventario";

export function InventariosPage() {
  const { agregarInventario, loading, error } = useAgregarInventario();
  const { eliminarInventario, loading: loadingEliminar, error: errorEliminar } = useEliminarInventario();
  
  return (
    <InventariosTemplate
      onSubmit={agregarInventario}
      onEliminar={eliminarInventario}
      loading={loading}
      error={error}
      loadingEliminar={loadingEliminar}
      errorEliminar={errorEliminar}
    />
  );
}

