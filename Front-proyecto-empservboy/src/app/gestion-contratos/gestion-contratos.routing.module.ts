import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarContratosComponent } from "./listar-contratos/listar-contratos.component";
import { CrearContratoComponent } from "./crear-contrato/crear-contrato.component";
import { ActualizarContratoComponent } from "./actualizar-contrato/actualizar-contrato.component";

export const routes: Routes = [
    { path: '', component: ListarContratosComponent },
    { path: 'listar', component: ListarContratosComponent },
    { path: 'crear', component: CrearContratoComponent },
    { path: 'actualizar/:codigo', component: ActualizarContratoComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionContratosRoutingModule{}
