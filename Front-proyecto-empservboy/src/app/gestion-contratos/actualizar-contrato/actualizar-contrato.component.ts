import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from '../Interfaces/contrato.interface';
import { GestionContratosService } from '../gestion-contratos-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-contrato',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actualizar-contrato.component.html',
  styleUrl: './actualizar-contrato.component.css'
})
export class ActualizarContratoComponent {
  contratoForm!: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private contratoService: GestionContratosService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('codigo') || '';

    this.contratoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      clienteId: ['', Validators.required],
      tipo: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
    });

    this.contratoService.getContrato(this.id).subscribe({
      next: (contrato) => {
        this.contratoForm.patchValue(contrato);
      },
      error: (err) => {
        console.error('Error al cargar contrato:', err);
        alert('No se pudo cargar el contrato');
      },
    });
  }

  onSubmit(): void {
    if (this.contratoForm.valid) {
      const formValues = this.contratoForm.getRawValue();
      const contratoActualizado: Contrato = {
        ...formValues,
        id: this.id
      };

      this.contratoService.updateContrato(contratoActualizado).subscribe({
        next: () => {
          alert('Contrato actualizado con éxito');
          this.router.navigate(['/contratos']);
        },
        error: (err) => {
          console.error('Error al actualizar contrato:', err);
          alert('No se pudo actualizar el contrato');
        },
      });
    }
  }
}
