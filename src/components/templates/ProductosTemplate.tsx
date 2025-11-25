import { useState, useRef, useEffect } from "react";
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
  const [recargarLista, setRecargarLista] = useState(0);
  const formularioRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (producto: ProductoDTO) => {
    try {
      if (productoEditando) {
        await onActualizar(productoEditando.codigo, producto);
        setProductoEditando(null);
        setMostrarFormulario(false);
      } else {
        await onSubmit(producto);
        setMostrarFormulario(false);
      }
      // Forzar recarga de la lista
      setRecargarLista((prev) => prev + 1);
    } catch (err) {
      // Error ya manejado en los hooks
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
    try {
      await onEliminar(producto.codigo);
      // Forzar recarga de la lista
      setRecargarLista((prev) => prev + 1);
    } catch (err) {
      // Error ya manejado en los hooks
    }
  };

  const handleMostrarFormulario = () => {
    if (!productoEditando) {
      setMostrarFormulario(!mostrarFormulario);
      // Scroll al formulario después de que se renderice
      setTimeout(() => {
        formularioRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  useEffect(() => {
    if (mostrarFormulario && formularioRef.current) {
      formularioRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [mostrarFormulario]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Inventario de Productos</h2>
          <p className="text-muted">
            Gestiona el catálogo de productos del almacén.
          </p>
        </div>
        <BotonSimple
          texto={
            mostrarFormulario && !productoEditando
              ? "Ocultar Formulario"
              : "+ Nuevo Producto"
          }
          onClick={handleMostrarFormulario}
        />
      </div>

      <ListaProductos
        onEditar={handleEditar}
        onEliminar={handleEliminar}
        recargar={recargarLista ? true : false}
      />
      {(loading || loadingActualizar || loadingEliminar) && <p>Cargando...</p>}
      {(error || errorActualizar || errorEliminar) && (
        <p className="text-danger">
          {error || errorActualizar || errorEliminar}
        </p>
      )}

      {mostrarFormulario && (
        <div className="mb-4" ref={formularioRef}>
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
