interface PrecioProductoProps {
  precio?: number;
}
export function PrecioProducto(props: PrecioProductoProps) {
  const { precio } = props;
  return (
    <>
      <span className={`bg-success text-white rounded px-2 py-1`}>
        ${precio?.toFixed(2)}
      </span>
    </>
  );
}
