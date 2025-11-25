import { useEffect, useState, useCallback } from "react";
import type { LotesDTO } from "../types/Lotes";

export function useLotes() {
  const [lotes, setLotes] = useState<LotesDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarLotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const URL =
        "https://almacenlp-production-3050.up.railway.app/api/Lotes";
      const res = await fetch(URL);
      if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
      const data = await res.json();
      // Convertir fechas de string a Date si vienen como strings
      const lotesConFechas: LotesDTO[] = data.map((lote: {
        codigoProducto: string;
        codigoAlmacen: string;
        codigo: string;
        cantidad: number;
        fechaIngreso: string | Date;
        fechaVencimiento: string | Date;
      }) => ({
        ...lote,
        fechaIngreso: lote.fechaIngreso ? new Date(lote.fechaIngreso) : new Date(),
        fechaVencimiento: lote.fechaVencimiento ? new Date(lote.fechaVencimiento) : new Date(),
      }));
      setLotes(lotesConFechas);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error al cargar lotes";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarLotes();
  }, [cargarLotes]);

  return { lotes, loading, error, recargar: cargarLotes };
}
