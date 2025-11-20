import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GestionRecepcionResiduosRoutingModule } from './gestion-recepcion-residuos.routing.module';
import { ListarRecepcionesComponent } from './listar-recepciones/listar-recepciones.component';
import { CrearRecepcionComponent } from './crear-recepcion/crear-recepcion.component';
import { ActualizarRecepcionComponent } from './actualizar-recepcion/actualizar-recepcion.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    GestionRecepcionResiduosRoutingModule,
    ListarRecepcionesComponent,
    CrearRecepcionComponent,
    ActualizarRecepcionComponent
  ]
})
export class GestionRecepcionResiduosModule { }
