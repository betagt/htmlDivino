"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var UsuarioDetailComponent = (function () {
    function UsuarioDetailComponent(usuarioService, activatedRoute) {
        this.usuarioService = usuarioService;
        this.activatedRoute = activatedRoute;
        this.routeParams = this.activatedRoute.snapshot.params;
        this.params = new http_1.URLSearchParams();
    }
    UsuarioDetailComponent.prototype.ngOnInit = function () {
        this.params.set('include', 'roles,endereco,telefones');
        this.show(this.routeParams.id);
    };
    UsuarioDetailComponent.prototype.show = function (id) {
        var _this = this;
        this.usuarioService.show(id, this.params).subscribe(function (usuario) { return _this.usuario = usuario; });
    };
    UsuarioDetailComponent.prototype.changeListener = function ($event) {
        this.sendFile($event.target);
    };
    UsuarioDetailComponent.prototype.sendFile = function (inputValue) {
        var _this = this;
        var id = this.routeParams.id;
        var formData = new FormData();
        var file = inputValue.files[0];
        formData.append('imagem', file, file.name);
        this.usuarioService.sendFile(id, formData).subscribe(function (res) {
            _this.usuario.imagem = res.data.imagem;
        });
    };
    UsuarioDetailComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario-detail',
            templateUrl: './usuario-detail.component.html',
            styleUrls: ['./usuario-detail.component.scss']
        })
    ], UsuarioDetailComponent);
    return UsuarioDetailComponent;
}());
exports.UsuarioDetailComponent = UsuarioDetailComponent;
