interface PrecioProductoProps {
  precio?: number;
}
export function PrecioProducto(props: PrecioProductoProps) {
  const { precio } = props;
  return (
    <>
      <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-dark)' }}>
        ${precio?.toFixed(2)}
      </span>
    </>
  );
}
