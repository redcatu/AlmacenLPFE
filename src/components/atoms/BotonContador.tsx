interface BotonContadorProps {
  numero: number;
  incrementar: () => void;
  decrementar: () => void;
}
export function BotonContador(props: BotonContadorProps) {
  const { numero, incrementar, decrementar } = props;
  return (
    <>
      <button className="btn btn-secondary" onClick={decrementar}>
        -
      </button>
      <label className="mx-2">{numero}</label>
      <button className="btn btn-secondary" onClick={incrementar}>
        +
      </button>
    </>
  );
}
