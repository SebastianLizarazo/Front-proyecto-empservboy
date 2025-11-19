import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../Interfaces/cliente.interface';
import { GestionClientesServiceService } from '../gestion-clientes-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './actualizar-clientes.component.html',
  styleUrl: './actualizar-clientes.component.css'
})
export class ActualizarClientesComponent {
  clienteForm!: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: GestionClientesServiceService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('codigo') || '';

    this.clienteForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });

    this.clienteService.getCliente(this.id).subscribe({
      next: (cliente) => {
        this.clienteForm.patchValue(cliente);
      },
      error: (err) => {
        console.error('Error al cargar estudiante:', err);
        alert('No se pudo cargar el estudiante');
      },
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const formValues = this.clienteForm.getRawValue();
      const clienteActualizado: Cliente = {
        ...formValues,
        id: this.id
      };

      this.clienteService.updateCliente(clienteActualizado).subscribe({
        next: () => {
          alert('Cliente actualizado con éxito');
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error al actualizar cliente:', err);
          alert('No se pudo actualizar el cliente');
        },
      });
    }
  }
}
