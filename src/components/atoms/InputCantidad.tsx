export function InputCantidad({ valor, onChange }: any) {
  return (
    <>
      <input
        type="number"
        className="form-control form-control-color-sm w-auto"
        style={{ width: "50px" }}
        value={valor}
        onChange={onChange}
      />
    </>
  );
}
