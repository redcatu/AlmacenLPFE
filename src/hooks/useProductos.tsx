import { useEffect, useState, useCallback } from "react";
import type { ProductoDTO } from "../types/Producto";

export function useProductos() {
  const [productos, setProductos] = useState<ProductoDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarProductos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const URL =
        "https://almacenlp-production-3050.up.railway.app/api/Productos";
      const res = await fetch(URL);
      if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar productos";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarProductos();
  }, [cargarProductos]);

  return { productos, loading, error, recargar: cargarProductos };
}
