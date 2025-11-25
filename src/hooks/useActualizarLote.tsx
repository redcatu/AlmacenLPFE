import { useState } from "react";
import type { LotesDTO } from "../types/Lotes";

export function useActualizarLote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actualizarLote = async (codigo: string, lote: LotesDTO) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://almacenlp-production-3050.up.railway.app/api/Lotes/${codigo}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(lote),
        }
      );

      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al actualizar producto";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { actualizarLote, loading, error };
}
