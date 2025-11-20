import { Component } from '@angular/core';
import { Cliente } from '../Interfaces/cliente.interface';
import { GestionClientesServiceService } from '../gestion-clientes-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-clientes',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './crear-clientes.component.html',
  styleUrl: './crear-clientes.component.css'
})
export class CrearClientesComponent {

clienteForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clienteService: GestionClientesServiceService,
    private router: Router
  ) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.clienteForm.valid) {
      const nuevoCliente: Cliente = this.clienteForm.value;

      this.clienteService.addCliente(nuevoCliente).subscribe({
        next: (res) => {
          console.log('Cliente creado:', res);
          alert('Cliente creado con éxito');
          this.clienteForm.reset();
          this.router.navigate(['/clientes']);
        },
        error: (err) => {
          console.error('Error al crear cliente:', err);
          alert('Error al guardar el cliente');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/clientes']);
  }
}
