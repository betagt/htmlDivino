"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var forms_1 = require('@angular/forms');
var usuario_list_component_1 = require('./usuario-list/usuario-list.component');
var usuario_form_component_1 = require('./usuario-form/usuario-form.component');
var usuario_detail_component_1 = require('./usuario-detail/usuario-detail.component');
var usuarios_routing_1 = require('./usuarios.routing');
var shared_module_1 = require('../shared/shared.module');
var ng2_pagination_1 = require('ng2-pagination');
// import { UsuarioFormGuard } from './usuario-form/usuario-form.guard';
var UsuariosModule = (function () {
    function UsuariosModule() {
    }
    UsuariosModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                usuarios_routing_1.UsuariosRouting,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                ng2_pagination_1.Ng2PaginationModule,
            ],
            declarations: [
                usuario_list_component_1.UsuarioListComponent,
                usuario_form_component_1.UsuarioFormComponent,
                usuario_detail_component_1.UsuarioDetailComponent
            ],
            exports: [
                router_1.RouterModule,
                usuario_list_component_1.UsuarioListComponent,
            ],
            providers: [],
        })
    ], UsuariosModule);
    return UsuariosModule;
}());
exports.UsuariosModule = UsuariosModule;
