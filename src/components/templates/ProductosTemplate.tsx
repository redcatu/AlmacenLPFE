import { useState } from "react";
import { ListaProductos } from "../organism/ListaProductos";
import { FormularioProducto } from "../organism/FormularioProducto";
import { BotonSimple } from "../atoms/BotonSimple";
import type { ProductoDTO } from "../../types/Producto";

interface ProductosTemplateProps {
  onSubmit: (producto: ProductoDTO) => Promise<void>;
  onActualizar: (codigo: string, producto: ProductoDTO) => Promise<void>;
  onEliminar: (codigo: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  loadingActualizar: boolean;
  errorActualizar: string | null;
  loadingEliminar: boolean;
  errorEliminar: string | null;
}

export function ProductosTemplate({
  onSubmit,
  onActualizar,
  onEliminar,
  loading,
  error,
  loadingActualizar,
  errorActualizar,
  loadingEliminar,
  errorEliminar,
}: ProductosTemplateProps) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState<ProductoDTO | null>(
    null
  );

  const handleSubmit = async (producto: ProductoDTO) => {
    if (productoEditando) {
      await onActualizar(productoEditando.codigo, producto);
      setProductoEditando(null);
      setMostrarFormulario(false);
    } else {
      await onSubmit(producto);
      setMostrarFormulario(false);
    }
  };

  const handleEditar = (producto: ProductoDTO) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  const handleCancelarEdicion = () => {
    setProductoEditando(null);
    setMostrarFormulario(false);
  };

  const handleEliminar = async (producto: ProductoDTO) => {
    if (!confirm("¿Seguro que deseas eliminar este producto? D:")) return;
    await onEliminar(producto.codigo);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Inventario de Productos</h2>
          <p className="text-muted">Gestiona el catálogo de productos del almacén.</p>
        </div>
        <BotonSimple
          texto={mostrarFormulario && !productoEditando ? "Ocultar Formulario" : "+ Nuevo Producto"}
          onClick={() => {
            if (!productoEditando) setMostrarFormulario(!mostrarFormulario);
          }}
        />
      </div>

      <ListaProductos onEditar={handleEditar} onEliminar={handleEliminar} />
      {(loading || loadingActualizar || loadingEliminar) && <p>Cargando...</p>}
      {(error || errorActualizar || errorEliminar) && (
        <p className="text-danger">
          {error || errorActualizar || errorEliminar}
        </p>
      )}

      {mostrarFormulario && (
        <div className="mb-4">
          <FormularioProducto
            onSubmit={handleSubmit}
            productoInicial={productoEditando || undefined}
            modoEdicion={!!productoEditando}
            onCancel={productoEditando ? handleCancelarEdicion : undefined}
          />
        </div>
      )}
    </div>
  );
}
