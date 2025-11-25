interface InputProps {
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
}

export function Input(props: InputProps) {
  const { type = "text", value, onChange, placeholder, name, disabled } = props;
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
        disabled={disabled}
      />
    </>
  );
}
