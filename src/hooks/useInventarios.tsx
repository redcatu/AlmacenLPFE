import { useEffect, useState } from "react";
import type { InventariosDTO } from "../types/Inventarios";

export function useInventarios() {
  const [inventarios, setInventarios] = useState<InventariosDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const URL =
      "https://almacenlp-production-3050.up.railway.app/api/Inventarios";

    const cargarInventarios = async () => {
      setLoading(true);
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
        const data = await res.json();
        setInventarios(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error al cargar inventarios";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    cargarInventarios();
  }, []);
  return { inventarios, loading, error };
}
