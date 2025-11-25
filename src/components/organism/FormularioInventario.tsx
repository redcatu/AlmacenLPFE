import { useState, useEffect } from "react";
import type { InventariosDTO } from "../../types/Inventarios";
import { CampoFormulario } from "../molecules/CampoFormulario";
import { SelectProducto } from "../molecules/SelectProducto";
import { BotonSimple } from "../atoms/BotonSimple";
import { useProductos } from "../../hooks/useProductos";

interface FormularioInventarioProps {
  onSubmit: (inventario: Omit<InventariosDTO, "productoStock">) => void;
  inventarioInicial?: InventariosDTO;
  modoEdicion?: boolean;
  onCancel?: () => void;
}

export function FormularioInventario({
  onSubmit,
  inventarioInicial,
  modoEdicion = false,
  onCancel
}: FormularioInventarioProps) {
  const { productos } = useProductos();
  const [codigo, setCodigo] = useState("");
  const [codigoProducto, setCodigoProducto] = useState("");
  // Valores predefinidos
  const codigoAlmacen = "1";
  const codigoLote = "LOTE";

  useEffect(() => {
    if (inventarioInicial) {
      setCodigo(inventarioInicial.codigo);
      setCodigoProducto(inventarioInicial.codigoProducto);
    }
  }, [inventarioInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevoInventario: Omit<InventariosDTO, "productoStock"> = {
      codigo,
      codigoProducto,
      codigoAlmacen,
      codigoLote,
    };
    onSubmit(nuevoInventario);

    if (!modoEdicion) {
      setCodigo("");
      setCodigoProducto("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CampoFormulario
        texto="Código"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        disabled={modoEdicion}
      />

      <SelectProducto
        texto="Código Producto"
        value={codigoProducto}
        onChange={(e) => setCodigoProducto(e.target.value)}
        productos={productos}
      />



      <div className="mb-3">
        <small className="text-muted">
          Nota: La cantidad (productoStock) siempre inicia en 0
        </small>
      </div>

      <div className="d-flex gap-2">
        <BotonSimple
          type="submit"
          texto={modoEdicion ? "Actualizar Inventario" : "Agregar Inventario"}
        />
        {modoEdicion && onCancel && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

