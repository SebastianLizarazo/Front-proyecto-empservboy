import { Component } from '@angular/core';
import { Residuo } from '../Interfaces/residuo.interface';
import { GestionRecepcionResiduosService } from '../gestion-recepcion-residuos-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-recepcion',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-recepcion.component.html',
  styleUrl: './crear-recepcion.component.css'
})
export class CrearRecepcionComponent {
  recepcionForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private residuoService: GestionRecepcionResiduosService,
    private router: Router
  ) {
    this.recepcionForm = this.fb.group({
      cliente_id: ['', Validators.required],
      tipo_residuo: ['', Validators.required],
      cantidad_kg: ['', [Validators.required, Validators.min(0)]],
      fecha_recepcion: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.recepcionForm.valid) {
      const nuevaRecepcion: Residuo = this.recepcionForm.value;

      this.residuoService.addResiduo(nuevaRecepcion).subscribe({
        next: (res) => {
          console.log('Recepción creada:', res);
          alert('Recepción creada con éxito');
          this.recepcionForm.reset();
          this.router.navigate(['/residuos']);
        },
        error: (err) => {
          console.error('Error al crear recepción:', err);
          alert('Error al guardar la recepción');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/residuos']);
  }
}
