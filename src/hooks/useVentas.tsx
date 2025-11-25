import { useEffect, useState } from "react";
import type { VentasDTO } from "../types/Ventas";

export function useVentas() {
    const [ventas, setVentas] = useState<VentasDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const URL =
            "https://almacenlp-production-3050.up.railway.app/api/Ventas/Ventas";

        const cargarVentas = async () => {
            setLoading(true);
            try {
                const res = await fetch(URL);
                if (!res.ok) throw new Error(`${res.status}-${res.statusText}`);
                const data = await res.json();
                setVentas(data);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "Error al cargar ventas";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        cargarVentas();
    }, []);
    return { ventas, loading, error };
}
