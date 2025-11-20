import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './gestion-usuarios.routing.module';
import { GestionUsuariosService } from './gestion-usuarios-service.service';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { ActualizarUsuarioComponent } from './actualizar-usuario/actualizar-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListarUsuariosComponent,
    CrearUsuarioComponent,
    ActualizarUsuarioComponent
  ],
  providers: [GestionUsuariosService]
})
export class GestionUsuariosModule { }
