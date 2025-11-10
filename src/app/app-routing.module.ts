import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HuespedesComponent } from './components/huespedes/huespedes.component';
import { HabitacionesComponent } from './components/habitaciones/habitaciones.component';
import { ReservacionesComponent } from './components/reservaciones/reservaciones.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

//! DEFINIR RUTAS
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'huespedes', component: HuespedesComponent },
      { path: 'habitaciones', component: HabitacionesComponent },
      { path: 'reservaciones', component: ReservacionesComponent },
      { path: 'usuarios', component: UsuariosComponent },
    ],
  }, //! ESTO LO MODIFICQUE, SE AGREGA EL COMPONENTE DE  DASHBORAD
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
