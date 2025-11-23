import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { GestionContratosService } from '../gestion-contratos-service.service';
import { GestionClientesServiceService } from '../../gestion-clientes/gestion-clientes-service.service';
import { Contrato } from '../Interfaces/contrato.interface';
import { Cliente } from '../../gestion-clientes/Interfaces/cliente.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listar-contratos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listar-contratos.html',
  styleUrl: './listar-contratos.css'
})
export class ListarContratos implements OnInit {
  contratos: Contrato[] = [];
  clientes: Map<string, string> = new Map();

  constructor(
    private contratoService: GestionContratosService,
    private clienteService: GestionClientesServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.getClientes().subscribe({
      next: (clientes: Cliente[]) => {
        clientes.forEach(cliente => {
          if (cliente.id) {
            this.clientes.set(cliente.id, cliente.nombre);
          }
        });
        this.getContratos();
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.getContratos();
      }
    });
  }

  getContratos(): void {
    this.contratoService.getContratos().subscribe({
      next: (data: Contrato[]) => {
        this.contratos = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener contratos:', err);
        alert('Error al cargar los contratos');
      },
    });
  }

  getNombreCliente(clienteId: string): string {
    return this.clientes.get(clienteId) || clienteId;
  }

  crearContrato(): void {
    this.router.navigate(['/contratos/crear']);
  }

  actualizarContrato(id?: string): void {
    if (id) {
      this.router.navigate(['/contratos/actualizar', id]);
    }
  }

  eliminarContrato(id?: string): void {
    if (id && confirm('¿Está seguro de eliminar este contrato?')) {
      this.contratoService.deleteContratoById(id).subscribe({
        next: (success) => {
          if (success) {
            alert('Contrato eliminado con éxito');
            this.getContratos();
          } else {
            alert('No se pudo eliminar el contrato');
          }
        },
        error: (err) => {
          console.error('Error al eliminar contrato:', err);
          alert('Error al eliminar el contrato');
        },
      });
    }
  }
}
