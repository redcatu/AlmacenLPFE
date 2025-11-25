interface StockProgresoProps {
  cantidadDisponible?: number;
  capacidadMaxima?: number;
}
export function StockProgreso(props: StockProgresoProps) {
  const { cantidadDisponible, capacidadMaxima } = props;
  return (
    <>
      <p>
        {cantidadDisponible} / {capacidadMaxima}
      </p>
    </>
  );
}
