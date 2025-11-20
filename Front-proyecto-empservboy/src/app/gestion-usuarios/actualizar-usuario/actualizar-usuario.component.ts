import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../Interfaces/usuario.interface';
import { GestionUsuariosService } from '../gestion-usuarios-service.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar-usuario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css'
})
export class ActualizarUsuarioComponent {
  usuarioForm!: FormGroup;
  id: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService: GestionUsuariosService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('codigo') || '';

    this.usuarioForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      usuarioId: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
    });

    this.usuarioService.getUsuario(this.id).subscribe({
      next: (usuario) => {
        this.usuarioForm.patchValue(usuario);
      },
      error: (err) => {
        console.error('Error al cargar usuario:', err);
        alert('No se pudo cargar el usuario');
      },
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.valid) {
      const formValues = this.usuarioForm.getRawValue();
      const usuarioActualizado: Usuario = {
        ...formValues,
        id: this.id
      };

      this.usuarioService.updateUsuario(usuarioActualizado).subscribe({
        next: () => {
          alert('Usuario actualizado con éxito');
          this.router.navigate(['/usuarios']);
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
          alert('No se pudo actualizar el usuario');
        },
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/usuarios']);
  }
}
