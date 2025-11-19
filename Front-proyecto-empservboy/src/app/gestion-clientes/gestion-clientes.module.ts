import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './gestion-clientes.routing.module';
import { GestionClientesServiceService } from './gestion-clientes-service.service';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { CrearClientesComponent } from './crear-clientes/crear-clientes.component';
import { ActualizarClientesComponent } from './actualizar-clientes/actualizar-clientes.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListarClientesComponent,
    CrearClientesComponent,
    ActualizarClientesComponent
  ],
  providers: [GestionClientesServiceService]
})
export class GestionClientesModule { }
