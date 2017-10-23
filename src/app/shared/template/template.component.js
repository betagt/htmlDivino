"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var TemplateComponent = (function () {
    function TemplateComponent(router, authService) {
        this.router = router;
        this.authService = authService;
        this.options = [
            {
                text: 'Inicio',
                link: '/home',
                icon: 'zmdi zmdi-home',
                disabled: false
            },
            {
                text: 'Usuarios',
                icon: 'zmdi zmdi-accounts',
                disabled: false,
                child: [{
                        text: 'Listar',
                        link: '/usuarios',
                        disabled: false,
                    }]
            },
            {
                text: 'Acessos',
                icon: 'zmdi zmdi-lock',
                disabled: false,
                child: [{
                        text: 'Listar',
                        link: '/rota_acesso',
                        disabled: false,
                    }]
            }];
        this.usuario = this.authService.getUser();
    }
    TemplateComponent.prototype.ngOnInit = function () {
    };
    TemplateComponent.prototype.logout = function () {
        this.authService.removeToken();
        this.authService.removeUser();
        this.router.navigateByUrl('/login');
    };
    TemplateComponent = __decorate([
        core_1.Component({
            selector: 'app-usuarios',
            templateUrl: './template.component.html',
            styleUrls: ['./template.component.css'],
        })
    ], TemplateComponent);
    return TemplateComponent;
}());
exports.TemplateComponent = TemplateComponent;
