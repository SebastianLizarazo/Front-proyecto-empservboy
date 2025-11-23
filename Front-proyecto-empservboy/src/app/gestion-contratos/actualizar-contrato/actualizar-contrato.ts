import { Component, OnInit } from '@angular/core';
import { Contrato } from '../Interfaces/contrato.interface';
import { Cliente } from '../../gestion-clientes/Interfaces/cliente.interface';
import { GestionContratosService } from '../gestion-contratos-service.service';
import { GestionClientesServiceService } from '../../gestion-clientes/gestion-clientes-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualizar-contrato',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './actualizar-contrato.html',
  styleUrl: './actualizar-contrato.css'
})
export class ActualizarContrato implements OnInit {
  contratoForm: FormGroup;
  contratoId: string = '';
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private contratoService: GestionContratosService,
    private clienteService: GestionClientesServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.contratoForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      clienteId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.contratoId = this.route.snapshot.paramMap.get('codigo') || '';
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (data: Cliente[]) => {
        this.clientes = data;
        this.cargarContrato();
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.cargarContrato();
      }
    });
  }

  cargarContrato(): void {
    if (this.contratoId) {
      this.contratoService.getContrato(this.contratoId).subscribe({
        next: (data: Contrato) => {
          this.contratoForm.patchValue({
            id: data.id,
            clienteId: data.clienteId,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            valor: data.valor,
            tipo: data.tipo,
          });
        },
        error: (err) => {
          console.error('Error al cargar contrato:', err);
          alert('No se pudo cargar el contrato');
        },
      });
    }
  }

  onSubmit(): void {
    if (this.contratoForm.valid && this.contratoId) {
      const contratoActualizado: Contrato = this.contratoForm.getRawValue();

      this.contratoService.updateContrato(contratoActualizado).subscribe({
        next: (res) => {
          console.log('Contrato actualizado:', res);
          alert('Contrato actualizado con éxito');
          this.router.navigate(['/contratos']);
        },
        error: (err) => {
          console.error('Error al actualizar contrato:', err);
          alert('Error al actualizar el contrato');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/contratos']);
  }
}
