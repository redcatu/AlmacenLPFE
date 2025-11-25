interface TextoNavProps {
  texto: string;
}

export function TextoNav(props: TextoNavProps) {
  const { texto } = props;
  return (
    <>
      <span>{texto}</span>
    </>
  );
}

