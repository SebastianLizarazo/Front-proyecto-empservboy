export interface Contrato {
    id?: string;
    clienteId: string;
    fechaInicio: string;
    fechaFin: string;
    valor: string | number;
    tipo: string;
}
