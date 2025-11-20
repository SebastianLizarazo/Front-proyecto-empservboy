import { ChangeDetectorRef, Component } from '@angular/core';
import { Contrato } from '../Interfaces/contrato.interface';
import { GestionContratosService } from '../gestion-contratos-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listar-contratos',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listar-contratos.component.html',
  styleUrl: './listar-contratos.component.css'
})
export class ListarContratosComponent {
  public contratos: Contrato[] = [];

  constructor(
    private contratoService: GestionContratosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.contratoService.getContratos().subscribe({
      next: (result) => {
        console.log("Respuesta completa: ", result);
        this.contratos = result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al obtener los datos: ", err);
      }
    });
  }

  crearContrato(): void {
    this.router.navigate(['/contratos/crear']);
  }

  actualizarContrato(id: string | undefined): void {
    if (!id) {
      console.error('ID de contrato no disponible');
      return;
    }
    this.router.navigate(['/contratos/actualizar', id]);
  }

  eliminarContrato(id: string | undefined): void {
    if (!id) {
      console.error('ID de contrato no disponible');
      return;
    }
    this.contratoService.deleteContratoById(id).subscribe({
      next: () => {
        alert('Contrato eliminado con éxito');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar contrato:', err);
        alert('No se pudo eliminar el contrato');
      },
    });
  }
}
