import { useState } from "react";

export function useEliminarInventario() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eliminarInventario = async (codigo: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://almacenlp-production-3050.up.railway.app/api/Inventarios/${codigo}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);

      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al eliminar inventario";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { eliminarInventario, loading, error };
}
