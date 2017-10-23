"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var HeaderComponent = (function () {
    function HeaderComponent(contextMenuService, viewContainer, contextService, componentFactoryResolver) {
        this.contextMenuService = contextMenuService;
        this.contextService = contextService;
        this.componentFactoryResolver = componentFactoryResolver;
        this.options = [
            {
                text: 'Inicio',
                link: '/',
                icon: 'zmdi zmdi-home',
                disabled: false
            },
            {
                text: 'Usuarios',
                link: '/usuarios',
                icon: 'zmdi zmdi-accounts',
                disabled: false,
                child: [{
                        text: 'Listar',
                        action: function () {
                            return true;
                        },
                        link: '/usuarios',
                        disabled: false,
                    }]
            }];
        contextMenuService.viewContainerRef = viewContainer;
        /* const teste = contextMenuService.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent));
         teste.instance.options= this.options;
     
           console.log(teste.instance.options);*/
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'app-header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss']
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
