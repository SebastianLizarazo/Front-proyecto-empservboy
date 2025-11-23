import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Residuo } from '../Interfaces/residuo.interface';
import { Cliente } from '../../gestion-clientes/Interfaces/cliente.interface';
import { GestionRecepcionResiduosService } from '../gestion-recepcion-residuos-service.service';
import { GestionClientesServiceService } from '../../gestion-clientes/gestion-clientes-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listar-recepciones',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listar-recepciones.component.html'
})
export class ListarRecepcionesComponent implements OnInit {
  public residuos: Residuo[] = [];
  clientes: Map<string, string> = new Map();

  constructor(
    private residuoService: GestionRecepcionResiduosService,
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
        this.getResiduos();
      },
      error: (err) => {
        console.error('Error al cargar clientes:', err);
        this.getResiduos();
      }
    });
  }

  getResiduos(): void {
    this.residuoService.getResiduos().subscribe({
      next: (result) => {
        console.log("Respuesta completa: ", result);
        this.residuos = result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al obtener los datos: ", err);
      }
    });
  }

  getNombreCliente(clienteId: string): string {
    return this.clientes.get(clienteId) || clienteId;
  }

  crearRecepcion(): void {
    this.router.navigate(['/residuos/crear']);
  }

  actualizarRecepcion(id: string | undefined): void {
    if (!id) {
      console.error('ID de recepción no disponible');
      return;
    }
    this.router.navigate(['/residuos/actualizar', id]);
  }

  eliminarRecepcion(id: string | undefined): void {
    if (!id) {
      console.error('ID de recepción no disponible');
      return;
    }
    this.residuoService.deleteResiduoById(id).subscribe({
      next: () => {
        alert('Recepción eliminada con éxito');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar recepción:', err);
        alert('No se pudo eliminar la recepción');
      },
    });
  }
}
