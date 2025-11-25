import { useState } from "react";
import type { LotesDTO } from "../types/Lotes";

export function useAgregarLote() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarLote = async (lote: Omit<LotesDTO, "fechaIngreso">) => {
    setLoading(true);
    setError(null);

    try {
      // La fecha de ingreso siempre es la fecha actual
      const loteCompleto: LotesDTO = {
        ...lote,
        fechaIngreso: new Date(),
      };

      const res = await fetch(
        "https://almacenlp-production-3050.up.railway.app/api/Lotes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loteCompleto),
        }
      );
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al agregar lote";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { agregarLote, loading, error };
}

