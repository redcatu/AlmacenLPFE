import { useState } from "react";
import type { InventariosDTO } from "../types/Inventarios";

export function useActualizarInventario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actualizarInventario = async (codigo: string, inventario: InventariosDTO) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://almacenlp-production-3050.up.railway.app/api/Inventarios/${codigo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inventario),
        }
      );

      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al actualizar inventario";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { actualizarInventario, loading, error };
}
