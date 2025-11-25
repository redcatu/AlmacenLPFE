interface TextoErrorProps {
  mensaje: string;
}
export function TextoError(props: TextoErrorProps) {
  const { mensaje } = props;
  return (
    <>
      <small className="text-danger">{mensaje}</small>
    </>
  );
}
