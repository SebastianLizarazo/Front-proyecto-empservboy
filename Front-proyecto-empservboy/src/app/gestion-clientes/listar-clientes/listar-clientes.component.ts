import { ChangeDetectorRef, Component } from '@angular/core';
import { Cliente } from '../Interfaces/cliente.interface';
import { GestionClientesServiceService } from '../gestion-clientes-service.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-listar-clientes',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listar-clientes.component.html',
  styleUrl: './listar-clientes.component.css'
})
export class ListarClientesComponent {
  public clientes: Cliente[]= [];

  constructor(private clienteService: GestionClientesServiceService,
    private router: Router,
    private cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
      this.clienteService.getClientes().subscribe({
        next: (result) => {
          console.log("Respuesta completa: ", result);
          this.clientes = result;
         this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Error al obtener los datos: ", err);
        }
      });
      console.log(this.clientes);
    }


    crearCliente(): void {
      this.router.navigate(['/clientes/crear']);
    }

    actualizarCliente(id: string | undefined): void {
      if (!id) {
        console.error('ID de cliente no disponible');
        return;
      }
      this.router.navigate(['/clientes/actualizar', id]);
    }

    eliminarCliente(id: string | undefined): void {
    if (!id) {
      console.error('ID de cliente no disponible');
      return;
    }
    this.clienteService.deleteClienteById(id).subscribe({
      next: () => {
        alert('Cliente eliminado con éxito');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar cliente:', err);
        alert('No se pudo eliminar el cliente');
      },
    });
    }
}
