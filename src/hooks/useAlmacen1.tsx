import { useEffect, useState } from "react";
import type { AlmacenesDTO } from "../types/Almacenes";

export function useAlmacen1() {
  const [almacen, setAlmacen] = useState<AlmacenesDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const URL =
      "https://almacenlp-production-3050.up.railway.app/api/Almacenes/1";

    const cargarAlmacen1 = async () => {
      setLoading(true);
      try {
        const res = await fetch(URL);
        if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
        const data = await res.json();
        setAlmacen(data as AlmacenesDTO);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error al cargar almacén";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    cargarAlmacen1();
  }, []);
  return { almacen, loading, error };
}

