import { Texto } from "../atoms/Texto";

interface InformacionProductoProps {
  descripcion: string;
  unidad: string;
  marca: string;
}

export function InformacionProducto(props: InformacionProductoProps) {
  const { descripcion, unidad, marca } = props;
  return (
    <>
      <div className="d-flex flex-column">
        <p>
          <strong>Descripcion: </strong> <Texto texto={descripcion}></Texto>
          <strong>Unidad Medida: </strong>
          <Texto texto={unidad}></Texto>
          <br />
          <strong> Marca: </strong> <Texto texto={marca}></Texto>
        </p>
      </div>
    </>
  );
}
