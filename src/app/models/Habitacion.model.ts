export interface HabitacionRequest {
  numero: number;
  idTipo: number;
  precio: number;
  capacidad: number;
  idEstado: number;
}

// tienen que empatar con lo que dice en java
export interface HabitacionResponse {
  id: number;
  numero: number;
  idTipo: number;
  precio: number;
  capacidad: number;
  idEstado: number;
}
