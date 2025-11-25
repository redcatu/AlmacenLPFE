interface TituloProps {
  titulo?: string;
}
export function Titulo(props: TituloProps) {
  const { titulo } = props;
  return (
    <>
      <h2 className="fw-bold">{titulo}</h2>
    </>
  );
}
