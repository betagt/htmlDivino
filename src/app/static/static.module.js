"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var shared_module_1 = require('../shared/shared.module');
var static_routing_1 = require('./static.routing');
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var static_component_1 = require('./static.component');
var StaticModule = (function () {
    function StaticModule() {
    }
    StaticModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                shared_module_1.SharedModule,
                static_routing_1.StaticRouting
            ],
            declarations: [
                home_component_1.HomeComponent,
                static_component_1.StaticComponent
            ],
            exports: [
                router_1.RouterModule
            ],
        })
    ], StaticModule);
    return StaticModule;
}());
exports.StaticModule = StaticModule;
