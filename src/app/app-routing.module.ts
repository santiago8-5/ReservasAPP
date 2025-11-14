import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HuespedesComponent } from './components/huespedes/huespedes.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { Roles } from './constants/Roles';

//! DEFINIR RUTAS
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'huespedes',
        component: HuespedesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'habitaciones',
        component: HabitacionesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'reservaciones',
        component: ReservacionesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'usuarios',
        component: UsuariosComponent,
        canActivate: [AuthGuard],
        data: { roles: [Roles.ADMIN] },
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' }, // para si se escribe a otra cosa te redirige al dashboard
  //! ESTO LO MODIFICQUE, SE AGREGA EL COMPONENTE DE  DASHBORAD
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
