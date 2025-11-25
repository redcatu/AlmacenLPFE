import { MovimientosTemplate } from "../templates/MovimientosTemplate";
import { useAgregarMovimiento } from "../../hooks/useAgregarMovimiento";

export function MovimientosPage() {
  const { agregarMovimiento, loading, error } = useAgregarMovimiento();
  
  return (
    <MovimientosTemplate
      onSubmit={agregarMovimiento}
      loading={loading}
      error={error}
    />
  );
}

