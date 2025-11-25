import { useState } from "react";
import type { MovimientosInventariosDTO } from "../types/MovimientosInventarios";

export function useAgregarMovimiento() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarMovimiento = async (movimiento: Omit<MovimientosInventariosDTO, "fecha">) => {
    setLoading(true);
    setError(null);

    try {
      // La fecha siempre es la fecha actual, convertir a ISO string para el API
      const fechaActual = new Date();
      const movimientoCompleto = {
        ...movimiento,
        fecha: fechaActual.toISOString(),
      };

      const res = await fetch(
        "https://almacenlp-production-3050.up.railway.app/api/MovimientoInventarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movimientoCompleto),
        }
      );
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`${res.status} - ${res.statusText}: ${errorText}`);
      }
      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error
        ? `Error al agregar movimiento: ${err.message}`
        : "Error al agregar movimiento";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { agregarMovimiento, loading, error };
}

