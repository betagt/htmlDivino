"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var forms_1 = require('@angular/forms');
var shared_module_1 = require('../shared/shared.module.ts');
var ng2_pagination_1 = require('ng2-pagination');
var rota_acesso_routing_1 = require('./rota-acesso.routing.js');
var rota_acesso_list_component_1 = require("./rota-acesso-list/rota-acesso-list.component");
var rota_acesso_service_1 = require("./rota-acesso.service.js");
var RotaAcessoModule = (function () {
    function RotaAcessoModule() {
    }
    RotaAcessoModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                shared_module_1.SharedModule,
                ng2_pagination_1.Ng2PaginationModule,
                rota_acesso_routing_1.RotaAcessoRouting
            ],
            declarations: [
                rota_acesso_list_component_1.RotaAcessoListComponent
            ],
            providers: [
                rota_acesso_service_1.RotaAcessoService,
            ]
        })
    ], RotaAcessoModule);
    return RotaAcessoModule;
}());
exports.RotaAcessoModule = RotaAcessoModule;
