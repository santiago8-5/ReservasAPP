import { Injectable } from '@angular/core';
import { enviroment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { HuespedRequest, HuespedResponse } from '../models/Huesped.model';

@Injectable({
  providedIn: 'root',
})
export class HuespedesService {
  private apiUr: string = enviroment.apiUrl.concat('huespedes/');

  constructor(private http: HttpClient) {}

  // Obtener todos los huéspedes
  getHuespedes(): Observable<HuespedResponse[]> {
    return this.http.get<HuespedResponse[]>(this.apiUr).pipe(
      // ordeno por id (siempre que exista id numeric). Evita usar sort() sin comparator.
      map((huespedes) =>
        (huespedes || []).sort((a, b) => (a.id as any) - (b.id as any))
      ),
      catchError((error) => {
        console.error('Error al obtener los huéspedes', error);
        return of([]);
      })
    );
  }

  // Registrar un huésped
  postHuesped(huesped: HuespedRequest): Observable<HuespedResponse> {
    return this.http.post<HuespedResponse>(this.apiUr, huesped).pipe(
      catchError((error) => {
        console.error('Error al registrar un huésped', error);
        return throwError(() => error);
      })
    );
  }

  // Actualizar un huésped — usar PUT (semánticamente correcto)
  putHuesped(
    huesped: HuespedRequest,
    huespedId: number
  ): Observable<HuespedResponse> {
    return this.http
      .put<HuespedResponse>(`${this.apiUr}${huespedId}`, huesped)
      .pipe(
        catchError((error) => {
          console.error('Error al actualizar un huésped', error);
          // muestra el body devuelto por el backend si existe
          if (error?.error) console.error('Backend error body:', error.error);
          return throwError(() => error);
        })
      );
  }

  // Eliminar un huésped
  deleteHuesped(huespedId: number): Observable<HuespedResponse> {
    return this.http.delete<HuespedResponse>(`${this.apiUr}${huespedId}`).pipe(
      catchError((error) => {
        console.error('Error al eliminar un huésped', error);
        return throwError(() => error);
      })
    );
  }
}
