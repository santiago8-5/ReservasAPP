export interface TipoDocumentoItem {
  codigo: number;
  descripcion: string;
  detalles: string;
}

export const TipoDocumentoLista: TipoDocumentoItem[] = [
  { codigo: 1, descripcion: 'INE', detalles: 'Credencial para votar' },
  {
    codigo: 2,
    descripcion: 'Pasaporte',
    detalles: 'Documento de viaje internacional',
  },
];

export function tipoDocumentoFromCodigo(codigo: number): TipoDocumentoItem {
  const encontrado = TipoDocumentoLista.find((t) => t.codigo === codigo);
  if (!encontrado) throw new Error(`Código de documento no válido: ${codigo}`);
  return encontrado;
}
