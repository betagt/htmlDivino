"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/do');
require('rxjs/add/observable/throw');
var usuarios_module_1 = require('./usuarios/usuarios.module');
var oAuth_canActivateGuard_1 = require('./_guard/oAuth.canActivateGuard');
var app_component_1 = require('./app.component');
var app_routing_1 = require('./app.routing');
var not_found_component_1 = require('./not-found/not-found.component');
var authentication_module_1 = require('./auth/authentication.module');
var auth_service_1 = require('./auth/auth.service');
var http_client_service_1 = require('./shared/http-client.service');
var static_module_1 = require('./static/static.module');
var ng2_slim_loading_bar_1 = require("ng2-slim-loading-bar");
var preloader_service_1 = require("./shared/services/preloader.service");
var preloader_full_component_1 = require("./shared/preloader-full/preloader-full.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                usuarios_module_1.UsuariosModule,
                static_module_1.StaticModule,
                authentication_module_1.AuthenticationModule,
                app_routing_1.AppRouting,
                ng2_slim_loading_bar_1.SlimLoadingBarModule.forRoot()
            ],
            declarations: [
                app_component_1.AppComponent,
                not_found_component_1.NotFoundComponent,
                preloader_full_component_1.PreloaderFullComponent
            ],
            exports: [
                ng2_slim_loading_bar_1.SlimLoadingBarModule,
            ],
            providers: [
                oAuth_canActivateGuard_1.CanActivateViaOAuthGuard,
                auth_service_1.AuthService,
                http_client_service_1.HttpClientService
            ],
            bootstrap: [
                app_component_1.AppComponent,
                preloader_service_1.PreloaderService
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
