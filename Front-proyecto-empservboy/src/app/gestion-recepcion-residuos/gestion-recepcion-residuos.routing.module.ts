import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarRecepcionesComponent } from './listar-recepciones/listar-recepciones.component';
import { CrearRecepcionComponent } from './crear-recepcion/crear-recepcion.component';
import { ActualizarRecepcionComponent } from './actualizar-recepcion/actualizar-recepcion.component';

const routes: Routes = [
  { path: '', redirectTo: 'listar', pathMatch: 'full' },
  { path: 'listar', component: ListarRecepcionesComponent },
  { path: 'crear', component: CrearRecepcionComponent },
  { path: 'actualizar/:codigo', component: ActualizarRecepcionComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionRecepcionResiduosRoutingModule { }
