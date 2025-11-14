export enum EstadoRegistroCodigo {
  ACTIVO = 1,
  ELIMINADO = 2,
}

export interface EstadoRegistro {
  codigo: EstadoRegistroCodigo;
  descripcion: string;
}

export const Estados: EstadoRegistro[] = [
  { codigo: EstadoRegistroCodigo.ACTIVO, descripcion: 'Activo' },
  { codigo: EstadoRegistroCodigo.ELIMINADO, descripcion: 'Eliminado' },
];

export function estadoFromCodigo(codigo: number): EstadoRegistro {
  const estado = Estados.find((e) => e.codigo === codigo);
  if (!estado) {
    throw new Error(`No existe Estado con el id: ${codigo}`);
  }

  return estado;
}

export function estadoFromDescripcion(descripcion: string): EstadoRegistro {
  const estado = Estados.find(
    (e) => e.descripcion === descripcion.trim().toLowerCase()
  );
  if (!estado) {
    throw new Error(`No existe Estado con el id: ${descripcion}`);
  }

  return estado;
}
