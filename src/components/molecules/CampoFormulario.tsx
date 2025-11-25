import { Texto } from "../atoms/Texto";
import { Input } from "../atoms/Input";

interface CampoFormularioProps {
  texto: string;
  value: number | string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}
export function CampoFormulario(props: CampoFormularioProps) {
  const { texto, value, onChange, type, placeholder, disabled } = props;
  return (
    <>
      <div className="mb-3">
        <Texto texto={texto}></Texto>
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        ></Input>
      </div>
    </>
  );
}
