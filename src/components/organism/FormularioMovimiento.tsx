import { useState, useEffect } from "react";
import type { MovimientosInventariosDTO } from "../../types/MovimientosInventarios";
import { CampoFormulario } from "../molecules/CampoFormulario";
import { SelectProducto } from "../molecules/SelectProducto";
import { BotonSimple } from "../atoms/BotonSimple";
import { useProductos } from "../../hooks/useProductos";
import { useLotes } from "../../hooks/useLotes";
import { useAlmacenes } from "../../hooks/useAlmacenes";

interface FormularioMovimientoProps {
  onSubmit: (movimiento: Omit<MovimientosInventariosDTO, "fecha">) => void;
  movimientoInicial?: MovimientosInventariosDTO;
  modoEdicion?: boolean;
  onCancel?: () => void;
}

export function FormularioMovimiento({
  onSubmit,
  movimientoInicial,
  modoEdicion = false,
  onCancel
}: FormularioMovimientoProps) {
  const { productos } = useProductos();
  const { lotes, loading: loadingLotes } = useLotes();
  const { almacenes, loading: loadingAlmacenes } = useAlmacenes();

  const [codigo, setCodigo] = useState("");
  const [codigoProducto, setCodigoProducto] = useState("");
  // Valores predefinidos
  const codigoCamion = "CAMION-001";
  const codigoAlmacen = "1";
  const codigoVenta = "VENTA-001";
  const [codigoLote, setCodigoLote] = useState("");
  const [tipoMovimiento, setTipoMovimiento] = useState("Entrada");
  const [cantidadBuena, setCantidadBuena] = useState(0);
  const [cantidadMala, setCantidadMala] = useState(0);
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    if (movimientoInicial) {
      setCodigo(movimientoInicial.codigo);
      setCodigoProducto(movimientoInicial.codigoProducto);
      setCodigoLote(movimientoInicial.codigoLote);
      setTipoMovimiento(movimientoInicial.tipoMovimiento);
      setCantidadBuena(movimientoInicial.cantidadBuena);
      setCantidadMala(movimientoInicial.cantidadMala);
      setMotivo(movimientoInicial.motivo);
    }
  }, [movimientoInicial]);

  // Obtener capacidad disponible del almacén actual
  const almacenActual = almacenes.find(a => a.codigo.toString() === codigoAlmacen);
  const capacidadDisponible = almacenActual?.cantidadDisponible ?? 0;

  // Filtrar lotes por producto y almacén para el select de Devolución
  const lotesFiltrados = lotes.filter(l =>
    l.codigoProducto === codigoProducto &&
    String(l.codigoAlmacen) === String(codigoAlmacen)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación de capacidad
    if (tipoMovimiento === "Entrada" || tipoMovimiento === "Devuelto") {
      const total = cantidadBuena + (tipoMovimiento === "Devuelto" ? cantidadMala : 0);
      if (total > capacidadDisponible) {
        alert(`Error: La cantidad total (${total}) excede la capacidad disponible del almacén (${capacidadDisponible}).`);
        return;
      }
    }

    // Validación de Lote para Devolución
    if (tipoMovimiento === "Devuelto" && !codigoLote) {
      alert("Error: Debe seleccionar un Lote para la devolución.");
      return;
    }

    // Si no es "Devuelto", cantidadMala debe ser 0
    const cantidadMalaFinal = tipoMovimiento === "Devuelto" ? cantidadMala : 0;

    // codigoLote solo se envía si es "Devuelto" (para Entrada el backend lo genera, para Salida no se usa)
    // NOTA: Para Entrada, el backend ignora este campo y genera uno nuevo.
    const codigoLoteFinal = tipoMovimiento === "Devuelto" ? codigoLote : "";

    const nuevoMovimiento: Omit<MovimientosInventariosDTO, "fecha"> = {
      codigo,
      codigoProducto,
      codigoCamion,
      codigoAlmacen,
      codigoVenta,
      codigoLote: codigoLoteFinal,
      cantidadBuena,
      cantidadMala: cantidadMalaFinal,
      tipoMovimiento,
      motivo,
    };
    onSubmit(nuevoMovimiento);

    if (!modoEdicion) {
      setCodigo("");
      setCodigoProducto("");
      setCodigoLote("");
      setTipoMovimiento("Entrada");
      setCantidadBuena(0);
      setCantidadMala(0);
      setMotivo("");
    }
  };

  // Determinar si mostrar selector de codigoLote (solo para Devuelto)
  // Para Entrada, el backend genera el lote automáticamente, así que no pedimos input.
  const mostrarSelectorLote = tipoMovimiento === "Devuelto";

  // Determinar si mostrar cantidadMala (solo para Devuelto)
  const mostrarCantidadMala = tipoMovimiento === "Devuelto";

  return (
    <form onSubmit={handleSubmit}>
      <CampoFormulario
        texto="Código Movimiento"
        value={codigo}
        onChange={(e) => setCodigo(e.target.value)}
        disabled={modoEdicion}
      />

      <SelectProducto
        texto="Código Producto"
        value={codigoProducto}
        onChange={(e) => {
          setCodigoProducto(e.target.value);
          setCodigoLote(""); // Resetear lote al cambiar producto
        }}
        productos={productos}
      />



      <div className="mb-3">
        <label className="form-label">Tipo de Movimiento</label>
        <select
          className="form-control"
          value={tipoMovimiento}
          onChange={(e) => {
            setTipoMovimiento(e.target.value);
            // Resetear cantidadMala si cambia a algo que no sea Devuelto
            if (e.target.value !== "Devuelto") {
              setCantidadMala(0);
            }
            // Resetear codigoLote
            setCodigoLote("");
          }}
          required
        >
          <option value="Entrada">Entrada</option>
          <option value="Salida">Salida</option>
          <option value="Devuelto">Devuelto</option>
        </select>
      </div>

      {mostrarSelectorLote && (
        <div className="mb-3">
          <label className="form-label">Código Lote (Para Devolución)</label>
          <select
            className="form-control"
            value={codigoLote}
            onChange={(e) => setCodigoLote(e.target.value)}
            required
            disabled={!codigoProducto || lotesFiltrados.length === 0}
          >
            <option value="">Seleccione un lote...</option>
            {lotesFiltrados.map((lote) => (
              <option key={lote.codigo} value={lote.codigo}>
                {lote.codigo} (Cant: {lote.cantidad})
              </option>
            ))}
          </select>
          {codigoProducto && lotesFiltrados.length === 0 && (
            <small className="text-danger d-block mt-1">
              No hay lotes registrados para este producto en este almacén. No se puede realizar devolución.
            </small>
          )}
        </div>
      )}

      <CampoFormulario
        texto="Cantidad Buena"
        type="number"
        value={cantidadBuena}
        onChange={(e) => setCantidadBuena(e.target.value === "" ? 0 : Number(e.target.value))}
      />

      {mostrarCantidadMala && (
        <CampoFormulario
          texto="Cantidad Mala"
          type="number"
          value={cantidadMala}
          onChange={(e) => setCantidadMala(e.target.value === "" ? 0 : Number(e.target.value))}
        />
      )}

      <CampoFormulario
        texto="Motivo"
        value={motivo}
        onChange={(e) => setMotivo(e.target.value)}
      />

      <div className="mb-3">
        <small className="text-muted">
          Fecha: {new Date().toLocaleDateString('es-ES')} (automática)
        </small>
      </div>

      <div className="d-flex gap-2">
        <BotonSimple
          type="submit"
          texto={loadingLotes || loadingAlmacenes ? "Cargando datos..." : (modoEdicion ? "Actualizar Movimiento" : "Agregar Movimiento")}
          disabled={loadingLotes || loadingAlmacenes}
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
    </form >
  );
}
