import { Component, OnInit } from '@angular/core';
import { Residuo } from '../Interfaces/residuo.interface';
import { GestionRecepcionResiduosService } from '../gestion-recepcion-residuos-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-recepcion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actualizar-recepcion.component.html',
  styleUrl: './actualizar-recepcion.component.css'
})
export class ActualizarRecepcionComponent implements OnInit {
  recepcionForm: FormGroup;
  recepcionId: string = '';

  constructor(
    private fb: FormBuilder,
    private residuoService: GestionRecepcionResiduosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recepcionForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      cliente_id: ['', Validators.required],
      tipo_residuo: ['', Validators.required],
      cantidad_kg: ['', [Validators.required, Validators.min(0)]],
      fecha_recepcion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.recepcionId = this.route.snapshot.paramMap.get('codigo') || '';

    if (this.recepcionId) {
      this.residuoService.getResiduo(this.recepcionId).subscribe({
        next: (data: Residuo) => {
          this.recepcionForm.patchValue({
            id: data.id,
            cliente_id: data.cliente_id,
            tipo_residuo: data.tipo_residuo,
            cantidad_kg: data.cantidad_kg,
            fecha_recepcion: data.fecha_recepcion,
          });
        },
        error: (err) => {
          console.error('Error al cargar recepción:', err);
          alert('No se pudo cargar la recepción');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.recepcionForm.valid && this.recepcionId) {
      const recepcionActualizada: Residuo = this.recepcionForm.getRawValue();

      this.residuoService.updateResiduo(recepcionActualizada).subscribe({
        next: (res) => {
          console.log('Recepción actualizada:', res);
          alert('Recepción actualizada con éxito');
          this.router.navigate(['/residuos']);
        },
        error: (err) => {
          console.error('Error al actualizar recepción:', err);
          alert('Error al actualizar la recepción');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/residuos']);
  }
}
