import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarContratos } from "./listar-contratos/listar-contratos";
import { CrearContrato } from "./crear-contrato/crear-contrato";
import { ActualizarContrato } from "./actualizar-contrato/actualizar-contrato";

export const routes: Routes = [
    { path: '', component: ListarContratos },
    { path: 'listar', component: ListarContratos },
    { path: 'crear', component: CrearContrato },
    { path: 'actualizar/:codigo', component: ActualizarContrato }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionContratosRoutingModule{}
