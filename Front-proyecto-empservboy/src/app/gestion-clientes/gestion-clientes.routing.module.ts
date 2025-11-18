import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarClientesComponent } from "./listar-clientes/listar-clientes.component.spec";
import { CrearClientesComponent } from "./crear-clientes/crear-clientes.component";
import { ActualizarClientesComponent } from "./actualizar-clientes/actualizar-clientes.component";

export const routes: Routes = [
    { path: '', component: ListarClientesComponent },
    { path: 'listar', component: ListarClientesComponent },
    { path: 'crear', component: CrearClientesComponent },
    { path: 'actualizar/:codigo', component: ActualizarClientesComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    //imports: [BrowserModule]
})
export class GestionClientesRoutingModule{}
