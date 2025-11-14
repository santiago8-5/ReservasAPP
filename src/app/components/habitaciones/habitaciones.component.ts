import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  HabitacionRequest,
  HabitacionResponse,
} from '../../models/Habitacion.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HabitacionesService } from '../../services/habitaciones.service';
import {
  tipoFromCodigo,
  TipoHabitacion,
  tiposHabitacion,
} from '../../constants/TipoHabitacion';

import {
  estadoFromCodigo,
  EstadoHabitacion,
  EstadoHabitacionCodigo,
  estados,
} from '../../constants/EstadoHabitacion';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { Roles } from '../../constants/Roles';

declare var bootstrap: any;
@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
})
// PAL FORMULARIO
export class HabitacionesComponent implements OnInit, AfterViewInit {
  habitaciones: HabitacionResponse[] = [];
  habitacionForm: FormGroup;
  modalText: string = 'Registrar Habitación';
  selectedHabitacion: HabitacionResponse | null = null;
  isEditMode: boolean = false;
  showActions: boolean = false;

  estadosHabitacion: EstadoHabitacion[] = estados;
  estadosHabitacionColor = [
    EstadoHabitacionCodigo.DISPONIBLE,
    EstadoHabitacionCodigo.OCUPADA,
    EstadoHabitacionCodigo.LIMPIEZA,
    EstadoHabitacionCodigo.MANTENIMIENTO,
  ];

  EstadoHabitacionCodigo = EstadoHabitacionCodigo;

  tipoHabitacion: TipoHabitacion[] = tiposHabitacion;

  @ViewChild('habitacionModalRef') habitacionModal!: ElementRef;
  private modalInstance!: any;

  // MISMO NOMRBE QUE TENGA EL FORMULARIO E INTERFAZ
  constructor(
    private fb: FormBuilder,
    private habitacionesService: HabitacionesService,
    private authService: AuthService
  ) {
    this.habitacionForm = fb.group({
      id: [null],
      numero: [null, [Validators.required, Validators.min(100)]],
      idTipo: [null, [Validators.required]],
      capacidad: [
        null,
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
      precio: [null, [Validators.required, Validators.min(1)]],
      idEstado: [null, [Validators.required]],
    });
  }

  // VA CRAGARGE
  ngOnInit(): void {
    this.listarHabitaciones();
    if (this.authService.hasRole(Roles.ADMIN)) this.showActions = true;
  }

  listarHabitaciones(): void {
    // AQUI PODRIAMOS AHCER UN IF, EN DONED COMPROBEMOS EL ROL SI ES ADMIN MANDAR A TRAER UN ENDPOINT DONDE TRAIGA TODOS SINO
    this.habitacionesService.getHabitaciones().subscribe({
      next: (resp) => {
        this.habitaciones = resp;
        console.log(this.habitaciones);
      },
    });
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(
      this.habitacionModal.nativeElement,
      { keyboard: false }
    );
    this.habitacionModal.nativeElement.addEventListener(
      'hidden.bs.modal',
      () => {
        this.resetForm();
      }
    );
  }

  //! AQUI ME FALTA VERIFICAR

  getTipoDescripcion(idTipo: number): string {
    try {
      return tipoFromCodigo(idTipo).descripcion;
    } catch {
      return 'Desconocida';
    }
  }

  getEstadoHabitacionDescripcion(idEstado: number): string {
    try {
      return estadoFromCodigo(idEstado).descripcion;
    } catch (error) {
      return 'Desconocido';
    }
  }

  toggleForm() {
    this.resetForm();
    this.modalText = 'Registrar Habitación';
    this.modalInstance.show();
  }

  editHabitacion(habitacion: HabitacionResponse): void {
    this.isEditMode = true;
    this.selectedHabitacion = habitacion;
    this.modalText = 'Editando Habitación N° ' + habitacion.numero;
    this.habitacionForm.patchValue({ ...habitacion }); // debe de tener los mismos nombres que en el formulario
    this.modalInstance.show();
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedHabitacion = null;
    this.habitacionForm.reset();
  }

  onSubmit() {
    if (this.habitacionForm.invalid) return;
    const habitacionData: HabitacionRequest = this.habitacionForm.value;

    if (this.isEditMode && this.selectedHabitacion) {
      const id = this.selectedHabitacion.id;
      this.habitacionesService.putHabitacion(habitacionData, id).subscribe({
        next: (updated) => {
          const index = this.habitaciones.findIndex((h) => h.id === id);
          if (index !== -1) this.habitaciones[index] = updated;
          Swal.fire(
            'Actualizando',
            'Habitacion Actualizada correctamente',
            'success'
          );
          this.modalInstance.hide();
        },
      });
    } else {
      this.habitacionesService.postHabitacion(habitacionData).subscribe({
        next: (newHabitacion) => {
          this.habitaciones.push(newHabitacion);
          Swal.fire(
            'Registrada',
            'Habitacion registrada correctamente',
            'success'
          );
          this.modalInstance.hide();
        },
      });
    }
  }

  deleteHabitacion(idHabitacion: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'La habitación será eliminada permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sin eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.habitacionesService.deleteHabitacion(idHabitacion).subscribe({
          next: () => {
            this.habitaciones = this.habitaciones.filter(
              (h) => h.id !== idHabitacion
            );
            Swal.fire(
              'Eliminada',
              'Habitacion eliminada correctamente',
              'success'
            );
          },
        });
      }
    });
  }
}
