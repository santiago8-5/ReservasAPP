import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { HuespedRequest, HuespedResponse } from '../../models/Huesped.model';
import { HuespedesService } from '../../services/huespedes.service';
import { AuthService } from '../../services/auth.service';
import { Roles } from '../../constants/Roles';

import {
  nacionalidades,
  Nacionalidad,
  nacionalidadFromCodigo,
} from '../../constants/Nacionalidad';
import {
  tipoDocumentoFromCodigo,
  TipoDocumentoLista,
} from '../../constants/tipo-documento';

// (Opcional) helpers/constantes que deberías tener para mostrar selects
// import { tiposDocumento, documentoFromId } from '../../constants/TipoDocumento';
// import { nacionalidades, nacionalidadFromId } from '../../constants/Nacionalidad';

declare var bootstrap: any;

@Component({
  selector: 'app-huespedes',
  templateUrl: './huespedes.component.html',
  styleUrls: ['./huespedes.component.css'],
})
export class HuespedesComponent implements OnInit, AfterViewInit {
  huespedes: HuespedResponse[] = [];
  nacionalidades: Nacionalidad[] = nacionalidades;
  tipoDocumentos = TipoDocumentoLista;
  huespedForm: FormGroup;
  modalText: string = 'Registrar Huésped';
  selectedHuesped: HuespedResponse | null = null;
  isEditMode: boolean = false;
  showActions: boolean = false;

  getNacionalidadDescripcion(idNacionalidad: number): string {
    try {
      return nacionalidadFromCodigo(idNacionalidad).descripcion;
    } catch {
      return 'Desconocida';
    }
  }

  getTipoDocumentoDescripcion(codigo: number): string {
    try {
      return tipoDocumentoFromCodigo(codigo).descripcion;
    } catch {
      return 'Desconocido';
    }
  }

  // Estos arrays asumen que tienes constantes definidas; si no, reemplaza por tu lista.
  // tiposDocumento = tiposDocumento;
  // nacionalidades = nacionalidades;

  @ViewChild('huespedModalRef') huespedModal!: ElementRef;
  private modalInstance!: any;

  constructor(
    private fb: FormBuilder,
    private huespedesService: HuespedesService,
    private authService: AuthService
  ) {
    // Validadores que empatan con tu HuespedRequest.java:
    // nombre (required, length 2-100), apellido (required, 2-100),
    // email (required, email), telefono (required, pattern),
    // idTipoDocumento y idNacionalidad (required, positive)
    this.huespedForm = this.fb.group({
      id: [null],
      nombre: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      apellido: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],
      telefono: [
        null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^[0-9]{10}$/),
        ],
      ],
      idTipoDocumento: [null, [Validators.required, Validators.min(1)]],
      idNacionalidad: [null, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.listarHuespedes();
    if (this.authService.hasRole(Roles.ADMIN)) this.showActions = true;
  }

  listarHuespedes(): void {
    this.huespedesService.getHuespedes().subscribe({
      next: (resp) => {
        this.huespedes = resp;
        console.log('Huéspedes cargados', this.huespedes);
      },
      error: (err) => {
        console.error('Error al listar huéspedes', err);
      },
    });
  }

  ngAfterViewInit(): void {
    this.modalInstance = new bootstrap.Modal(this.huespedModal.nativeElement, {
      keyboard: false,
    });
    this.huespedModal.nativeElement.addEventListener('hidden.bs.modal', () => {
      this.resetForm();
    });
  }

  toggleForm() {
    this.resetForm();
    this.modalText = 'Registrar Huésped';
    this.modalInstance.show();
  }

  editHuesped(huesped: HuespedResponse): void {
    this.isEditMode = true;
    this.selectedHuesped = huesped;
    this.modalText = `Editando Huésped: ${huesped.nombre} ${huesped.apellido}`;

    // buscar id tipo documento por descripción (si existe)
    const tipoDocId =
      TipoDocumentoLista.find(
        (t) =>
          t.descripcion.toLowerCase() ===
          (huesped.tipoDocumento || '').toLowerCase()
      )?.codigo ?? null;

    // buscar id nacionalidad por descripcion (si existe)
    const nacionalidadId =
      nacionalidades.find(
        (n) =>
          n.descripcion.toLowerCase() ===
          (huesped.nacionalidad || '').toLowerCase()
      )?.codigo ?? null;

    this.huespedForm.patchValue({
      nombre: huesped.nombre,
      apellido: huesped.apellido,
      email: huesped.email,
      telefono: huesped.telefono,
      idTipoDocumento: tipoDocId,
      idNacionalidad: nacionalidadId,
    });

    this.modalInstance.show();
  }

  resetForm(): void {
    this.isEditMode = false;
    this.selectedHuesped = null;
    this.huespedForm.reset();
  }

  onSubmit() {
    if (this.huespedForm.invalid) return;
    const huespedData: HuespedRequest = this.huespedForm.value;

    if (this.isEditMode && this.selectedHuesped) {
      // Si el backend necesita el id del huésped para PUT, asumimos selectedHuesped.id existe
      const id = (this.selectedHuesped.id as unknown as number) || null;
      if (id === null) {
        console.warn(
          'No se encontró id del huésped seleccionado. Abortando actualización.'
        );
        return;
      }
      this.huespedesService.putHuesped(huespedData, id).subscribe({
        next: (updated) => {
          const index = this.huespedes.findIndex((h) => h.id === updated.id);
          if (index !== -1) this.huespedes[index] = updated;
          Swal.fire(
            'Actualizando',
            'Huésped actualizado correctamente',
            'success'
          );
          this.modalInstance.hide();
        },
        error: (err) => {
          console.error('Error al actualizar huésped', err);
          Swal.fire('Error', 'No se pudo actualizar el huésped', 'error');
        },
      });
    } else {
      this.huespedesService.postHuesped(huespedData).subscribe({
        next: (newHuesped) => {
          this.huespedes.push(newHuesped);
          Swal.fire(
            'Registrado',
            'Huésped registrado correctamente',
            'success'
          );
          this.modalInstance.hide();
        },
        error: (err) => {
          console.error('Error al registrar huésped', err);
          Swal.fire('Error', 'No se pudo registrar el huésped', 'error');
        },
      });
    }
  }

  deleteHuesped(idHuesped: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'El huésped será eliminado permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.huespedesService.deleteHuesped(idHuesped).subscribe({
          next: () => {
            this.huespedes = this.huespedes.filter((h) => h.id !== idHuesped);
            Swal.fire(
              'Eliminado',
              'Huésped eliminado correctamente',
              'success'
            );
          },
          error: (err) => {
            console.error('Error al eliminar huésped', err);
            // intenta mostrar mensaje del backend si existe
            const message =
              err?.error?.message ||
              err?.error?.detail ||
              err?.message ||
              'Error interno al eliminar huésped';
            Swal.fire('Error', message, 'error');
          },
        });
      }
    });
  }
}
