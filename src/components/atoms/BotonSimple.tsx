interface BotonSimpleProps {
  texto?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
export function BotonSimple(props: BotonSimpleProps) {
  const { texto, onClick, type, disabled } = props;
  return (
    <>
      <button className="btn btn-primary" onClick={onClick} type={type} disabled={disabled}>
        {texto}
      </button>
    </>
  );
}
