import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarUsuariosComponent } from "./listar-usuarios/listar-usuarios.component";
import { CrearUsuarioComponent } from "./crear-usuario/crear-usuario.component";
import { ActualizarUsuarioComponent } from "./actualizar-usuario/actualizar-usuario.component";

export const routes: Routes = [
    { path: '', component: ListarUsuariosComponent },
    { path: 'listar', component: ListarUsuariosComponent },
    { path: 'crear', component: CrearUsuarioComponent },
    { path: 'actualizar/:codigo', component: ActualizarUsuarioComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GestionUsuariosRoutingModule{}
