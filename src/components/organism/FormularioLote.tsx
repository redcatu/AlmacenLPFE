import { useState, useEffect } from "react";
import type { LotesDTO } from "../../types/Lotes";
import { CampoFormulario } from "../molecules/CampoFormulario";
import { SelectProducto } from "../molecules/SelectProducto";
import { BotonSimple } from "../atoms/BotonSimple";
import { useProductos } from "../../hooks/useProductos";

interface FormularioLoteProps {
  onSubmit: (lote: Omit<LotesDTO, "fechaIngreso">) => void;
  loteInicial?: LotesDTO;
  modoEdicion?: boolean;
  onCancel?: () => void;
}

export function FormularioLote({
  onSubmit,
  loteInicial,
  modoEdicion = false,
  onCancel
}: FormularioLoteProps) {
  const { productos } = useProductos();
  const [codigo, setCodigo] = useState("");
  const [codigoProducto, setCodigoProducto] = useState("");
  // Valor predefinido
  const codigoAlmacen = "1";
  const [cantidad, setCantidad] = useState(0);
  const [fechaVencimiento, setFechaVencimiento] = useState("");

  // Obtener fecha mínima (mañana) para fecha de vencimiento
  const getFechaMinima = () => {
    const mañana = new Date();
    mañana.setDate(mañana.getDate() + 1);
    return mañana.toISOString().split('T')[0];
  };

  // Obtener fecha actual formateada para mostrar
  const getFechaActual = () => {
    return new Date().toLocaleDateString('es-ES');
  };

  useEffect(() => {
    if (loteInicial) {
      setCodigo(loteInicial.codigo);
      setCodigoProducto(loteInicial.codigoProducto);
      setCantidad(loteInicial.cantidad);
      // Formatear fecha de vencimiento para el input
      const fechaVenc = new Date(loteInicial.fechaVencimiento);
      setFechaVencimiento(fechaVenc.toISOString().split('T')[0]);
    }
  }, [loteInicial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar que la fecha de vencimiento sea después de hoy
    const fechaVenc = new Date(fechaVencimiento);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaVenc <= hoy) {
      alert("La fecha de vencimiento debe ser posterior a la fecha actual");
      return;
    }

    const nuevoLote: Omit<LotesDTO, "fechaIngreso"> = {
      codigo,
      codigoProducto,
      codigoAlmacen,
      cantidad,
      fechaVencimiento: fechaVenc as Date,
    };
    onSubmit(nuevoLote);

    if (!modoEdicion) {
      setCodigo("");
      setCodigoProducto("");
      setCantidad(0);
      setFechaVencimiento("");
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



      <CampoFormulario
        texto="Cantidad"
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value === "" ? 0 : Number(e.target.value))}
      />

      <div className="mb-3">
        <label className="form-label">Fecha de Vencimiento</label>
        <input
          type="date"
          className="form-control"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
          min={getFechaMinima()}
          required
        />
        <small className="text-muted">
          La fecha debe ser posterior a hoy ({getFechaActual()})
        </small>
      </div>

      <div className="mb-3">
        <small className="text-muted">
          Fecha de Ingreso: {getFechaActual()} (automática)
        </small>
      </div>

      <div className="d-flex gap-2">
        <BotonSimple
          type="submit"
          texto={modoEdicion ? "Actualizar Lote" : "Agregar Lote"}
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

