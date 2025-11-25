import { ProductosTemplate } from "../templates/ProductosTemplate";
import { useAgregarProducto } from "../../hooks/useAgregarProducto";
import { useActualizarProducto } from "../../hooks/useActualizarProducto";
import { useEliminarProducto } from "../../hooks/useEliminarProducto";

export function ProductosPage() {
  const { agregarProducto, loading, error } = useAgregarProducto();
  const {
    actualizarProducto,
    loading: loadingActualizar,
    error: errorActualizar,
  } = useActualizarProducto();
  const {
    eliminarProducto,
    loading: loadingEliminar,
    error: errorEliminar,
  } = useEliminarProducto();
  return (
    <ProductosTemplate
      onSubmit={agregarProducto}
      onActualizar={actualizarProducto}
      onEliminar={eliminarProducto}
      loading={loading}
      error={error}
      loadingEliminar={loadingEliminar}
      loadingActualizar={loadingActualizar}
      errorActualizar={errorActualizar}
      errorEliminar={errorEliminar}
    />
  );
}
