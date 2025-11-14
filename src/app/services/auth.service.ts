import { Injectable } from '@angular/core';
import { enviroment } from '../environments/environment';
import { JwtPayload, AuthRequest, AuthResponse } from '../models/Auth.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { JwtHelper } from '../shared/jwt.helper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl: string = enviroment.authUrl;
  private tokenKey: string = 'auth-token';
  private payload: JwtPayload | null = null;

  constructor(private http: HttpClient, private router: Router) {
    this.decodeToken();
  }

  login(username: string, password: string) {
    let AuthRequest: AuthRequest = { username: username, password: password };
    return this.http.post<AuthResponse>(this.authUrl, AuthRequest).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem(this.tokenKey, response.token);
          this.decodeToken();
        }
      })
    );
  }

  // Obtener el token
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // SABER SI ESTAMOS LOGGEADOS
  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token && !JwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.payload = null;
    this.router.navigate(['/login']);
  }

  // SI ESTA AUTENTICADO
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  /*
  Funciones de roles y usuarios
  */

  private decodeToken(): void {
    const token = this.getToken();
    this.payload = token ? JwtHelper.decodeToken(token) : null;
  }

  // usuario del tokje de la payload
  getUsername(): string | null {
    return this.payload?.sub || null;
  }

  // lista de roles
  getRoles(): string[] {
    return this.payload?.roles || [];
  }

  // si ese token tiene ese rol
  hasRole(rol: string): boolean {
    return this.getRoles().includes(rol);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((rol) => this.hasRole(rol));
  }
}
