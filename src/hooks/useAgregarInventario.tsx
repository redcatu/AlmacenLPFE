import { useState } from "react";
import type { InventariosDTO } from "../types/Inventarios";

export function useAgregarInventario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarInventario = async (inventario: Omit<InventariosDTO, "productoStock">) => {
    setLoading(true);
    setError(null);

    try {
      // La cantidad siempre empieza en 0
      const inventarioCompleto: InventariosDTO = {
        ...inventario,
        productoStock: 0,
      };

      const res = await fetch(
        "https://almacenlp-production-3050.up.railway.app/api/Inventarios",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(inventarioCompleto),
        }
      );
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al agregar inventario";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { agregarInventario, loading, error };
}
