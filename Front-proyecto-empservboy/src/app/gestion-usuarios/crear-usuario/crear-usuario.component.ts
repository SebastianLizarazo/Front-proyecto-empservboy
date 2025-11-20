import { Component } from '@angular/core';
import { Usuario } from '../Interfaces/usuario.interface';
import { GestionUsuariosService } from '../gestion-usuarios-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: GestionUsuariosService,
    private router: Router
  ) {
    this.usuarioForm = this.fb.group({
      usuarioId: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const nuevoUsuario: Usuario = this.usuarioForm.value;

      this.usuarioService.addUsuario(nuevoUsuario).subscribe({
        next: (res) => {
          console.log('Usuario creado:', res);
          alert('Usuario creado con éxito');
          this.usuarioForm.reset();
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          alert('Error al guardar el usuario');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
