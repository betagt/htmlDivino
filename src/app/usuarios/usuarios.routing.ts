import {Routes, RouterModule} from '@angular/router';

import {UsuarioListComponent} from './usuario-list/usuario-list.component';
import {UsuarioFormComponent} from './usuario-form/usuario-form.component';
import {UsuarioDetailComponent} from './usuario-detail/usuario-detail.component';
import {TemplateComponent} from '../shared/template/template.component';
import {PerfilComponent} from "./perfil/perfil.component";
import {MeusDadosDetailComponent} from "./perfil/meus-dados-detail/meus-dados-detail.component";
import {CanActivateViaOAuthGuard} from "../../core/guard/oAuth.guard";
import {ChecarRotaGuard} from "../../core/guard/checar-rota.guard";

const USUARIOS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
        children: [
            {path: '', component: UsuarioListComponent},
            {
                path: 'perfil', component: PerfilComponent,
                children: [
                    {path: '', component: MeusDadosDetailComponent}
                ]
            },
            {path: 'new', component: UsuarioFormComponent},
            {path: ':id/edit', component: UsuarioFormComponent},
            {path: ':id', component: UsuarioDetailComponent},
        ]
    },

];

export const UsuariosRouting = RouterModule.forChild(USUARIOS_ROUTES);
