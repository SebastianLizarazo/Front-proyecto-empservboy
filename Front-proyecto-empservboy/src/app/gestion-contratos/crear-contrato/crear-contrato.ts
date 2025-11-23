import { Component, OnInit } from '@angular/core';
import { Contrato } from '../Interfaces/contrato.interface';
import { Cliente } from '../../gestion-clientes/Interfaces/cliente.interface';
import { GestionContratosService } from '../gestion-contratos-service.service';
import { GestionClientesServiceService } from '../../gestion-clientes/gestion-clientes-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-contrato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './crear-contrato.html'
})
export class CrearContrato implements OnInit {
  contratoForm: FormGroup;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private contratoService: GestionContratosService,
    private clienteService: GestionClientesServiceService,
    private router: Router
  ) {
    this.contratoForm = this.fb.group({
      clienteId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        alert('Error al cargar la lista de clientes');
      }
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

  cancelar(): void {
    this.router.navigate(['/contratos']);
  }
}
