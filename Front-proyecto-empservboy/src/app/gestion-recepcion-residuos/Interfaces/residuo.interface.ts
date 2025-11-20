export interface Residuo {
    id?: string;
    cliente_id: string;
    tipo_residuo: string;
    cantidad_kg: string | number;
    fecha_recepcion: string;
}
