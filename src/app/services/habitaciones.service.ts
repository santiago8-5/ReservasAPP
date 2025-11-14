import { Injectable } from '@angular/core';
import { enviroment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import {
  HabitacionRequest,
  HabitacionResponse,
} from '../models/Habitacion.model';

@Injectable({
  providedIn: 'root',
})
export class HabitacionesService {
  private apiUr: string = enviroment.apiUrl.concat('habitaciones/');

  constructor(private http: HttpClient) {}

  //ELIMINADO
  getHabitaciones(): Observable<HabitacionResponse[]> {
    return this.http.get<HabitacionResponse[]>(this.apiUr).pipe(
      map((habitaciones) => habitaciones.sort()),
      catchError((error) => {
        console.error('Error al obtener las habitaciones', error);
        return of([]);
      })
    );
  }

  postHabitacion(
    habitacion: HabitacionRequest
  ): Observable<HabitacionResponse> {
    return this.http.post<HabitacionResponse>(this.apiUr, habitacion).pipe(
      catchError((error) => {
        console.error('Error al registrar una habitación', error);
        throw error;
      })
    );
  }

  putHabitacion(
    habitacion: HabitacionRequest,
    habitacionId: number
  ): Observable<HabitacionResponse> {
    return this.http
      .post<HabitacionResponse>(`${this.apiUr}${habitacionId}`, habitacion)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar una habitación', error);
          throw error;
        })
      );
  }

  deleteHabitacion(habitacionId: number): Observable<HabitacionResponse> {
    return this.http
      .delete<HabitacionResponse>(`${this.apiUr}${habitacionId}`)
      .pipe(
        catchError((error) => {
          console.error('Error al eliminar una habitación', error);
          throw error;
        })
      );
  }
}
