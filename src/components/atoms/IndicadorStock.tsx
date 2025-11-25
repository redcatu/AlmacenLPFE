interface IndicadorStockProps {
  numero?: number;
}
export function IndicadorStock(props: IndicadorStockProps) {
  const { numero } = props;
  return (
    <>
      <span>{numero}</span>
    </>
  );
}
