interface EstadoProps {
  tipo?: string;
}
export function Estado(props: EstadoProps) {
  const { tipo } = props;
  const colorClass =
    tipo === "Activo" || tipo === "Disponible"
      ? "badge text-bg-success"
      : tipo === "Inactivo" || tipo === "No disponible"
      ? "badge text-bg-danger"
      : "badge text-bg-secondary";
  return (
    <>
      <span className={colorClass}>{tipo}</span>
    </>
  );
}
