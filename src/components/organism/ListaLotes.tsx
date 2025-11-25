import { useLotes } from "../../hooks/useLotes";
import { CardLote } from "./CardLote";
import type { LotesDTO } from "../../types/Lotes";

interface ListaLotesProps {
  onEditar?: (lote: LotesDTO) => void;
  onEliminar?: (lote: LotesDTO) => void;
}

export function ListaLotes({ onEditar, onEliminar }: ListaLotesProps) {
  const { lotes, loading, error } = useLotes();
  if (loading) return <div>Cargando lotes...</div>;
  if (error) return <div className="text-danger">Error: {error}</div>;
  if (!lotes.length) return <div>No hay lotes</div>;
  return (
    <>
      <div className="row justify-content-center">
        {lotes.map((lote) => (
          <div key={lote.codigo} className="col-md-4 mb-3">
            <CardLote 
              lote={lote} 
              onEditar={onEditar} 
              onEliminar={onEliminar}
            />
          </div>
        ))}
      </div>
    </>
  );
}

