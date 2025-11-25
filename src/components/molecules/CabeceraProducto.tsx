import { Titulo } from "../atoms/Titulo";
import { CodigoProducto } from "../atoms/CodigoProducto";
import { Estado } from "../atoms/Estado";
interface CabeceraProductoProps {
  titulo?: string;
  codigo?: string;
  tipo?: string;
}
export function CabeceraProducto(props: CabeceraProductoProps) {
  const { titulo, codigo, tipo } = props;
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <Titulo titulo={titulo}></Titulo>
          <CodigoProducto codigo={codigo}></CodigoProducto>
          <Estado tipo={tipo}></Estado>
        </div>
      </div>
    </>
  );
}
