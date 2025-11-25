import { useState } from "react";
import type { ProductoDTO } from "../types/Producto";

export function useAgregarProducto() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const agregarProducto = async (producto: ProductoDTO) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        "https://almacenlp-production-3050.up.railway.app/api/Productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(producto),
        }
      );
      if (!res.ok) throw new Error(`${res.status} - ${res.statusText}`);
      return await res.json();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al agregar producto";
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { agregarProducto, loading, error };
}
