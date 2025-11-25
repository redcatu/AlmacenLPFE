interface CodigoProductoProps {
  codigo?: string;
}
export function CodigoProducto(props: CodigoProductoProps) {
  const { codigo } = props;
  return (
    <>
      <span className="badge bg-secondary">{codigo}</span>
    </>
  );
}
