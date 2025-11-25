import { useProductos } from "../../hooks/useProductos";
import { CardProducto } from "./CardProducto";
import type { ProductoDTO } from "../../types/Producto";

interface ListaProductosProps {
  onEditar: (producto: ProductoDTO) => void;
  onEliminar: (producto: ProductoDTO) => void;
}

export function ListaProductos({ onEditar, onEliminar }: ListaProductosProps) {
  const { productos, loading, error } = useProductos();
  if (loading) return <div>Cargando productos...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!productos.length) return <div>No hay productos</div>;
  return (
    <>
      <div className="row justify-content-center">
        {productos.map((p) => (
          <div key={p.codigo} className="col-md-4 mb-3">
            <CardProducto producto={p} onEditar={onEditar} onEliminar={onEliminar}></CardProducto>
          </div>
        ))}
      </div>
    </>
  );
}
