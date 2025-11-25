import { BotonContador } from "../atoms/BotonContador";
import { InputCantidad } from "../atoms/InputCantidad";
import { useState } from "react";

export function SelectorCantidad() {
  const [cantidad, setCantidad] = useState(0);

  const incrementar = () => setCantidad(cantidad + 1);
  const decrementar = () => setCantidad(cantidad - 1);
  const onInputChange = (e: any) => setCantidad(Number(e.target.value));
  return (
    <>
      <div>
        <BotonContador
          numero={cantidad}
          incrementar={incrementar}
          decrementar={decrementar}
        ></BotonContador>
        <InputCantidad onChange={onInputChange}></InputCantidad>
      </div>
    </>
  );
}
