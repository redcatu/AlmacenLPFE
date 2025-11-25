import { useState } from "react";
import { useVentas } from "../../hooks/useVentas";
import { ChevronDown, ChevronUp, Package } from "lucide-react";

export function ListaCargasPendientes() {
    const { ventas, loading, error } = useVentas();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    if (loading) return <div className="p-3 text-center text-muted">Cargando cargas pendientes...</div>;
    if (error) return <div className="p-3 text-center text-danger">Error al cargar ventas: {error}</div>;

    if (ventas.length === 0) {
        return (
            <div className="card mb-4 border-0 shadow-sm">
                <div className="card-body text-center py-4">
                    <p className="text-muted mb-0">No hay cargas pendientes</p>
                </div>
            </div>
        );
    }

    return (
        <div className="card mb-4 border-0 shadow-sm">
            <div className="card-header bg-white py-3">
                <h5 className="mb-0 d-flex align-items-center gap-2">
                    <Package size={20} className="text-primary" />
                    Cargas Pendientes (Pedidos)
                </h5>
            </div>
            <div className="list-group list-group-flush">
                {ventas.map((venta, index) => {
                    // Generar un ID único temporal ya que el DTO no tiene ID
                    const uniqueId = `venta-${index}-${venta.codigoProducto}`;
                    const isExpanded = expandedId === uniqueId;

                    return (
                        <div key={uniqueId} className="list-group-item">
                            <div
                                className="d-flex justify-content-between align-items-center cursor-pointer"
                                onClick={() => toggleExpand(uniqueId)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="d-flex align-items-center gap-3">
                                    <div className="badge bg-light text-dark border">
                                        #{index + 1}
                                    </div>
                                    <div>
                                        <span className="fw-medium">Pedido de Entrega</span>
                                        <div className="small text-muted">
                                            Producto: {venta.codigoProducto}
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-link text-muted p-0">
                                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </button>
                            </div>

                            {isExpanded && (
                                <div className="mt-3 ps-5 border-start ms-2">
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="small text-muted d-block">Código Producto</label>
                                            <span className="fw-medium">{venta.codigoProducto}</span>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="small text-muted d-block">Cantidad a Entregar</label>
                                            <span className="fw-bold text-primary">{venta.cantidad} unidades</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
