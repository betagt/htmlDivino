"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var auth_service_1 = require("../../core/services/auth.service");
var core_1 = require("@angular/core");
var Usuario = (function () {
    function Usuario(authService) {
        if (authService.getUser())
            this.load(authService.getUser());
    }
    Usuario.prototype.load = function (usuario) {
        this.id = usuario.id;
        this.name = usuario.name;
        this.email = usuario.email;
        this.email_alternativo = usuario.email_alternativo;
        this.sexo = usuario.sexo;
        this.imagem = usuario.imagem;
        this.status = usuario.status;
        this.chk_newsletter = usuario.chk_newsletter;
        this.roles = usuario.roles;
        this.permissions = usuario.permissions;
    };
    Usuario = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(auth_service_1.AuthService))
    ], Usuario);
    return Usuario;
}());
exports.Usuario = Usuario;
