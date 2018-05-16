"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require("@angular/forms");
var create_update_abstract_1 = require("../../../core/abstract/create-update.abstract");
var UsuarioFormComponent = (function (_super) {
    __extends(UsuarioFormComponent, _super);
    function UsuarioFormComponent(usuarioService, activatedRoute, formBuilder, ref, router) {
        _super.call(this, formBuilder, ref);
        this.usuarioService = usuarioService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.routeParams = this.activatedRoute.snapshot.params;
    }
    UsuarioFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        _super.prototype.form.call(this, {
            'name': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'email_confirmation': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'email_alternativo': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'password_confirmation': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'sexo': [1, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'chk_newsletter': [0]
        });
        if (this.routeParams.id) {
            this.usuarioService.show(this.routeParams.id).subscribe(function (usuario) {
                _this.saveForm.patchValue(usuario);
                _this.usuario = usuario;
            });
        }
    };
    UsuarioFormComponent.prototype.updateOrCreate = function (user) {
        var _this = this;
        if (!this.saveForm.invalid) {
            this.usuarioService.updateOrCreate(user, this.routeParams.id).subscribe(function (res) {
                _this.router.navigate(['/usuarios']);
            }, function (erro) {
            });
        }
    };
    UsuarioFormComponent.prototype.changeListener = function ($event) {
        this.sendFile($event.target);
    };
    UsuarioFormComponent.prototype.sendFile = function (inputValue) {
        var _this = this;
        var id = this.routeParams.id;
        var formData = new FormData();
        var file = inputValue.files[0];
        formData.append('imagem', file, file.name);
        this.usuarioService.sendFile(id, formData).subscribe(function (res) {
            _this.usuario.imagem = res.data.imagem;
        });
    };
    UsuarioFormComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario-form',
            templateUrl: './usuario-form.component.html',
            styleUrls: ['./usuario-form.component.scss']
        })
    ], UsuarioFormComponent);
    return UsuarioFormComponent;
}(create_update_abstract_1.CreateUpdateAbstract));
exports.UsuarioFormComponent = UsuarioFormComponent;
