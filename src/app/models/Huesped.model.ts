export interface HuespedRequest {
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  idTipoDocumento: number;
  idNacionalidad: number;
}

export interface HuespedResponse {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  tipoDocumento: string;
  nacionalidad: string;
}
