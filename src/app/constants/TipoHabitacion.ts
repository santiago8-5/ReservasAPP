export enum TipoHabitacionCodigo {
  INDIVIDUAL = 1,
  DOBLE = 2,
  SUITE = 3,
}

export interface TipoHabitacion {
  codigo: TipoHabitacionCodigo;
  descripcion: string;
}

export const tiposHabitacion: TipoHabitacion[] = [
  { codigo: TipoHabitacionCodigo.INDIVIDUAL, descripcion: 'Individual' },
  { codigo: TipoHabitacionCodigo.DOBLE, descripcion: 'Doble' },
  { codigo: TipoHabitacionCodigo.SUITE, descripcion: 'Suite' },
];

export function tipoFromCodigo(codigo: number): TipoHabitacion {
  const estado = tiposHabitacion.find((e) => e.codigo === codigo);
  if (!estado) {
    throw new Error(`No existe Tipo habitacion con el id: ${codigo}`);
  }

  return estado;
}

export function tipoFromDescripcion(descripcion: string): TipoHabitacion {
  const estado = tiposHabitacion.find(
    (e) => e.descripcion === descripcion.trim().toLowerCase()
  );
  if (!estado) {
    throw new Error(
      `No existe Tipo habitacion con la descripción: ${descripcion}`
    );
  }

  return estado;
}
