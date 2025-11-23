import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { routes } from './gestion-contratos.routing.module';
import { GestionContratosService } from './gestion-contratos-service.service';
import { ListarContratos } from './listar-contratos/listar-contratos';
import { CrearContrato } from './crear-contrato/crear-contrato';
import { ActualizarContrato } from './actualizar-contrato/actualizar-contrato';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ListarContratos,
    CrearContrato,
    ActualizarContrato
  ],
  providers: [GestionContratosService]
})
export class GestionContratosModule { }
