import { Texto } from "../atoms/Texto";
import { StockProgreso } from "../atoms/StockProgreso";
interface InformacionStockProps {
  texto?: string;
  cantidadDisponible?: number;
  capacidadMaxima?: number;
}
export function InformacionStock(props: InformacionStockProps) {
  const { texto, cantidadDisponible, capacidadMaxima } = props;

  return (
    <>
      <div className="d-flex flex-row">
        <Texto texto={texto}></Texto>
        <StockProgreso
          cantidadDisponible={cantidadDisponible}
          capacidadMaxima={capacidadMaxima}
        ></StockProgreso>
      </div>
    </>
  );
}
