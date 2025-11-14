export interface AuthRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface JwtPayload {
  sub: string; // usuario
  exp: number; // tiempo de expiracion
  roles: string[]; // roles del usuario
}
