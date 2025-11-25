import { useEffect, useState, useCallback } from "react";
import type { MovimientosInventariosDTO } from "../types/MovimientosInventarios";

export function useMovimientos() {
  const [movimientos, setMovimientos] = useState<MovimientosInventariosDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const cargarMovimientos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const URL =
        "https://almacenlp-production-3050.up.railway.app/api/MovimientoInventarios";
      const res = await fetch(URL);
      if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
      const data = await res.json();
      // Convertir fechas de string a Date si vienen como strings
      const movimientosConFechas: MovimientosInventariosDTO[] = data.map((mov: {
        codigo: string;
        codigoProducto: string;
        codigoCamion: string;
        codigoAlmacen: string;
        codigoVenta: string;
        codigoLote: string;
        cantidadBuena: number;
        cantidadMala: number;
        tipoMovimiento: string;
        motivo: string;
        fecha: string | Date;
      }) => ({
        ...mov,
        fecha: mov.fecha ? new Date(mov.fecha) : new Date(),
      }));
      setMovimientos(movimientosConFechas);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? `Error al cargar movimientos: ${err.message}` 
        : "Error al cargar movimientos";
      setError(errorMessage);
      // Si es 404, establecer array vacío en lugar de mostrar error
      if (err instanceof Error && err.message.includes("404")) {
        setMovimientos([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    cargarMovimientos();
  }, [cargarMovimientos]);

  return { movimientos, loading, error, recargar: cargarMovimientos };
}

