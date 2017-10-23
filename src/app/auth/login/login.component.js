"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var LoginComponent = (function () {
    function LoginComponent(router, authService, formBuilder, usuariosService) {
        this.router = router;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.usuariosService = usuariosService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.loginForm = this.formBuilder.group({
            'username': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(64)])],
            'password': [null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(3), forms_1.Validators.maxLength(32)])]
        });
    };
    LoginComponent.prototype.login = function (formData) {
        var _this = this;
        if (!this.loginForm.invalid) {
            this.authService.getAccessToken(formData)
                .subscribe(function (response) {
                return _this.usuariosService.getUserPerfil().subscribe(function (userResponse) {
                    _this.authService.setAuthenticated(userResponse);
                    _this.usuariosService.getRotaAcessos().subscribe(function (rotas) {
                        _this.authService.setRotas(rotas);
                        _this.router.navigate(['/home']);
                    });
                });
            }, function (error) {
            });
        }
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: 'login.component.html',
            styleUrls: ['login.component.scss']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
