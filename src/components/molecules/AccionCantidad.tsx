import { SelectorCantidad } from "./SelectorCantidad";
import { BotonSimple } from "../atoms/BotonSimple";
interface AccionCantidadProps {
  textoBoton?: string;
  onClick?: () => void;
}

export function AccionCantidad(props: AccionCantidadProps) {
  const { textoBoton, onClick } = props;
  return (
    <>
      <div className="d-flexx gap-2 align-items-center">
        <SelectorCantidad></SelectorCantidad>
        <BotonSimple texto={textoBoton} onClick={onClick}></BotonSimple>
      </div>
    </>
  );
}
