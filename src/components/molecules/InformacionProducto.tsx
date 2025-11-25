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
        <p style={{ marginBottom: '0.75rem', color: 'var(--color-text-dark)' }}>
          <Texto texto={descripcion}></Texto>
        </p>
        <p style={{ marginBottom: 0, color: 'var(--color-text-gray)', fontSize: '0.875rem' }}>
          U: <Texto texto={unidad}></Texto> Marca: <Texto texto={marca}></Texto>
        </p>
      </div>
    </>
  );
}
