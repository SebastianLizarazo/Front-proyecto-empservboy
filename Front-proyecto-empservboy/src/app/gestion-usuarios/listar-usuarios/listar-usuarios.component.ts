import { ChangeDetectorRef, Component } from '@angular/core';
import { Usuario } from '../Interfaces/usuario.interface';
import { GestionUsuariosService } from '../gestion-usuarios-service.service';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [NgFor],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css'
})
export class ListarUsuariosComponent {
  public usuarios: Usuario[] = [];

  constructor(
    private usuarioService: GestionUsuariosService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
      next: (result) => {
        console.log("Respuesta completa: ", result);
        this.usuarios = result;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error("Error al obtener los datos: ", err);
      }
    });
  }

  crearUsuario(): void {
    this.router.navigate(['/usuarios/crear']);
  }

  actualizarUsuario(id: string | undefined): void {
    if (!id) {
      console.error('ID de usuario no disponible');
      return;
    }
    this.router.navigate(['/usuarios/actualizar', id]);
  }

  eliminarUsuario(id: string | undefined): void {
    if (!id) {
      console.error('ID de usuario no disponible');
      return;
    }
    this.usuarioService.deleteUsuarioById(id).subscribe({
      next: () => {
        alert('Usuario eliminado con éxito');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert('No se pudo eliminar el usuario');
      },
    });
  }
}
