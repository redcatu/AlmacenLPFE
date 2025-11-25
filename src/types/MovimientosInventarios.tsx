export interface MovimientosInventariosDTO {
  codigoProducto: string;
  codigoCamion: string;
  codigoAlmacen: string;
  codigoVenta: string;
  codigoLote: string;
  codigo: string;
  cantidadBuena: number;
  cantidadMala: number;
  tipoMovimiento: string;
  motivo: string;
  fecha: Date;
}