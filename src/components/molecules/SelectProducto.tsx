import { Texto } from "../atoms/Texto";
import type { ProductoDTO } from "../../types/Producto";

interface SelectProductoProps {
  texto: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  productos: ProductoDTO[];
  disabled?: boolean;
}

export function SelectProducto(props: SelectProductoProps) {
  const { texto, value, onChange, productos, disabled } = props;
  return (
    <>
      <div className="mb-3">
        <Texto texto={texto}></Texto>
        <select
          className="form-control"
          value={value}
          onChange={onChange}
          disabled={disabled}
          required
        >
          <option value="">Seleccione un producto</option>
          {productos.map((producto) => (
            <option key={producto.codigo} value={producto.codigo}>
              {producto.codigo} - {producto.nombre}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

