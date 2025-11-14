export enum EstadoHabitacionCodigo {
  DISPONIBLE = 1,
  OCUPADA = 2,
  LIMPIEZA = 3,
  MANTENIMIENTO = 4,
}

export interface EstadoHabitacion {
  codigo: EstadoHabitacionCodigo;
  descripcion: string;
}

export const estados: EstadoHabitacion[] = [
  { codigo: EstadoHabitacionCodigo.DISPONIBLE, descripcion: 'Disponible' },
  { codigo: EstadoHabitacionCodigo.OCUPADA, descripcion: 'Ocupada' },
  { codigo: EstadoHabitacionCodigo.LIMPIEZA, descripcion: 'En Limpieza' },
  {
    codigo: EstadoHabitacionCodigo.MANTENIMIENTO,
    descripcion: 'En Mantenimiento',
  },
];

export function estadoFromCodigo(codigo: number): EstadoHabitacion {
  const estado = estados.find((e) => e.codigo === codigo);
  if (!estado) {
    throw new Error(`No existe Estado con el id: ${codigo}`);
  }

  return estado;
}

export function estadoFromDescripcion(descripcion: string): EstadoHabitacion {
  const estado = estados.find(
    (e) => e.descripcion === descripcion.trim().toLowerCase()
  );
  if (!estado) {
    throw new Error(`No existe Estado con el id: ${descripcion}`);
  }

  return estado;
}
