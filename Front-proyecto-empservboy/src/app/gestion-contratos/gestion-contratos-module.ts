import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './gestion-contratos.routing.module';
import { GestionContratosService } from './gestion-contratos-service.service';
import { ListarContratosComponent } from './listar-contratos/listar-contratos.component';
import { CrearContratoComponent } from './crear-contrato/crear-contrato.component';
import { ActualizarContratoComponent } from './actualizar-contrato/actualizar-contrato.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListarContratosComponent,
    CrearContratoComponent,
    ActualizarContratoComponent
  ],
  providers: [GestionContratosService]
})
export class GestionContratosModule { }
