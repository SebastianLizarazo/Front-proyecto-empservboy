import { Component } from '@angular/core';
import { Contrato } from '../Interfaces/contrato.interface';
import { GestionContratosService } from '../gestion-contratos-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-contrato',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-contrato.component.html',
  styleUrl: './crear-contrato.component.css'
})
export class CrearContratoComponent {
  contratoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private contratoService: GestionContratosService,
    private router: Router
  ) {
    this.contratoForm = this.fb.group({
      clienteId: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.contratoForm.valid) {
      const nuevoContrato: Contrato = this.contratoForm.value;

      this.contratoService.addContrato(nuevoContrato).subscribe({
        next: (res) => {
          console.log('Contrato creado:', res);
          alert('Contrato creado con éxito');
          this.contratoForm.reset();
          this.router.navigate(['/contratos']);
        },
        error: (err) => {
          console.error('Error al crear contrato:', err);
          alert('Error al guardar el contrato');
        },
      });
    }
  }
}
