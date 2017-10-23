"use strict";
var router_1 = require('@angular/router');
var not_found_component_1 = require('./not-found/not-found.component');
var oAuth_guard_1 = require('./_guard/oAuth.guard');
var login_component_1 = require('./auth/login/login.component');
var checar_rota_guard_1 = require("./_guard/checar-rota.guard");
var APP_ROUTES = [
    {
        path: 'rota_acesso', loadChildren: 'app/rota_acesso/rota-acesso.module#RotaAcessoModule',
        canActivate: [oAuth_guard_1.CanActivateViaOAuthGuard],
    },
    {
        path: 'usuarios', loadChildren: 'app/usuarios/usuarios.module#UsuariosModule',
        canActivate: [oAuth_guard_1.CanActivateViaOAuthGuard],
        canActivateChild: [checar_rota_guard_1.ChecarRotaGuard],
    },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'notfound', component: not_found_component_1.NotFoundComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: 'notfound' }
];
exports.AppRouting = router_1.RouterModule.forRoot(APP_ROUTES);
