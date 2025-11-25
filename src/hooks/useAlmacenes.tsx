import { useEffect, useState } from "react";
import type { AlmacenesDTO } from "../types/Almacenes";

export function useAlmacenes() {
  const [almacenes, setAlmacenes] = useState<AlmacenesDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const URL =
      "https://almacenlp-production-3050.up.railway.app/api/Almacenes";

    const cargarAlmacenes = async () => {
      setLoading(true);
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
        const data = await res.json();
        setAlmacenes(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error al cargar almacenes";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    cargarAlmacenes();
  }, []);
  return { almacenes, loading, error };
}
