import { ChangeDetectorRef, Component } from '@angular/core';
import { Residuo } from '../Interfaces/residuo.interface';
import { GestionRecepcionResiduosService } from '../gestion-recepcion-residuos-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listar-recepciones',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listar-recepciones.component.html',
  styleUrl: './listar-recepciones.component.css'
})
export class ListarRecepcionesComponent {
  public residuos: Residuo[] = [];

  constructor(
    private residuoService: GestionRecepcionResiduosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
