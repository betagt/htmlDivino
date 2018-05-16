import {Routes, RouterModule} from '@angular/router';

import {UsuarioListComponent} from './usuario-list/usuario-list.component';
import {UsuarioFormComponent} from './usuario-form/usuario-form.component';
import {UsuarioDetailComponent} from './usuario-detail/usuario-detail.component';
import {TemplateComponent} from '../shared/template/template.component';
import {PerfilComponent} from "./perfil/perfil.component";
import {MeusDadosDetailComponent} from "./perfil/meus-dados-detail/meus-dados-detail.component";
import {CanActivateViaOAuthGuard} from "../../core/guard/oAuth.guard";
import {ChecarRotaGuard} from "../../core/guard/checar-rota.guard";
import {UsuarioClienteListComponent} from "./usuario-cliente-list/usuario-cliente-list.component";
import {UsuarioSistemaListComponent} from "./usuario-sistema-list/usuario-sistema-list.component";
import {UsuarioClienteFormComponent} from "./usuario-cliente-form/usuario-cliente-form.component";
import {UsuarioClienteDetailComponent} from "./usuario-cliente-detail/usuario-cliente-detail.component";
import {UsuarioSistemaDetailComponent} from "./usuario-sistema-detail/usuario-sistema-detail.component";
import {UsuarioSistemaFormComponent} from "./usuario-sistema-form/usuario-sistema-form.component";

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
            {path: 'cliente', component: UsuarioClienteListComponent},
            {path: 'cliente/new', component: UsuarioClienteFormComponent},
            {path: 'cliente/:id/edit', component: UsuarioClienteFormComponent},
            {path: 'cliente/:id', component: UsuarioClienteDetailComponent},

            {path: 'sistema', component: UsuarioSistemaListComponent},
            {path: 'sistema/new', component: UsuarioSistemaFormComponent},
            {path: 'sistema/:id/edit', component: UsuarioSistemaFormComponent},
            {path: 'sistema/:id', component: UsuarioSistemaDetailComponent},

            {path: 'new', component: UsuarioFormComponent},
            {path: ':id/edit', component: UsuarioFormComponent},
            {path: ':id', component: UsuarioDetailComponent},
        ]
    },

];

export const UsuariosRouting = RouterModule.forChild(USUARIOS_ROUTES);
