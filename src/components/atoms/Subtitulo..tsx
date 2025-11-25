interface SubtituloProps {
  subtitulo?: string;
}
export function Subtitulo(props: SubtituloProps) {
  const { subtitulo } = props;
  return (
    <>
      <h4 className="text-muted">{subtitulo}</h4>
    </>
  );
}
