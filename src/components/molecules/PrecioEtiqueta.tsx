import { CodigoProducto } from "../atoms/CodigoProducto";
import { PrecioProducto } from "../atoms/PrecioProducto";
interface PrecioEtiquetaProps {
  precio: number;
  codigo: string;
}
export function PrecioEtiqueta(props: PrecioEtiquetaProps) {
  const { precio, codigo } = props;
  return (
    <>
      <div className="d-flex gap-2 align-items-center">
        <CodigoProducto codigo={codigo}></CodigoProducto>
        <PrecioProducto precio={precio}></PrecioProducto>
      </div>
    </>
  );
}
