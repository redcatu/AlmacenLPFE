interface TextoProps {
  texto?: any;
}

export function Texto(props: TextoProps) {
  const { texto } = props;
  return (
    <>
      <label>{texto}</label>
    </>
  );
}
