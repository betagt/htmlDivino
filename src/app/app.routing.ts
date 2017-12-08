import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {NotFoundComponent} from './not-found/not-found.component';

import {CanActivateViaOAuthGuard} from '../core/guard/oAuth.guard';
import {LoginComponent} from './auth/login/login.component';
import {ChecarRotaGuard} from "../core/guard/checar-rota.guard";
import {TemplateComponent} from "./shared/template/template.component";
import {ConfiguracoesComponent} from "./configuracoes/configuracoes.component";

const APP_ROUTES: Routes = [
    {
        path: 'rota_acesso', loadChildren: 'app/rota-acesso/rota-acesso.module#RotaAcessoModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'perfil-usuario', loadChildren: 'app/roles/roles.module#RolesModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'permissions', loadChildren: 'app/permissions/permissions.module#PermissionsModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'transporte', loadChildren: 'app/transporte/transporte.module#TransporteModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'configuracoes', component: TemplateComponent,
        children: [
            {path: '', component: ConfiguracoesComponent},
        ]
    },
    {path: 'login', component: LoginComponent},
    {path: 'notfound', canActivate: [CanActivateViaOAuthGuard], canActivateChild: [ChecarRotaGuard], component: NotFoundComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', redirectTo: 'notfound'}
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
