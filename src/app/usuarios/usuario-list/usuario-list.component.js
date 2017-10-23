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
var http_1 = require('@angular/http');
var list_abstract_1 = require('../../../core/abstract/list.abstract');
var forms_1 = require('@angular/forms');
var UsuarioListComponent = (function (_super) {
    __extends(UsuarioListComponent, _super);
    function UsuarioListComponent(usuariosService, formBuilder, ref) {
        _super.call(this, formBuilder, ref);
        this.usuariosService = usuariosService;
        this._page = 1;
        this._params = new http_1.URLSearchParams();
    }
    UsuarioListComponent.prototype.ngOnInit = function () {
        _super.prototype.form.call(this, {
            'name': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['asc']
        });
        this.list();
    };
    UsuarioListComponent.prototype.list = function (page) {
        var _this = this;
        if (page === void 0) { page = null; }
        this.addParams('include', 'roles');
        if (page) {
            this.addParams('page', page);
        }
        this.usuariosService.getUsers(this.params)
            .subscribe(function (usuarios) {
            _this.load(usuarios);
        });
    };
    UsuarioListComponent.prototype.load = function (usuarios) {
        this.usuarios = usuarios;
        this._total = usuarios.meta.pagination.total;
        this._page = usuarios.meta.pagination.current_page;
        this.arr = usuarios.data;
    };
    UsuarioListComponent.prototype.mountFilter = function (model) {
        var filter = {
            'filtro': {
                'users.name': model.name,
                'users.email': model.email
            },
            'order': model.field + ';' + model.order
        };
        return JSON.stringify(filter);
    };
    UsuarioListComponent.prototype.orderby = function (field) {
        var form = this.pesquisaForm.value;
        form.field = field;
        if (form.order == 'asc') {
            form.order = 'desc';
        }
        else {
            form.order = 'asc';
        }
        this.pesquisar(form);
    };
    UsuarioListComponent.prototype.pesquisar = function (filter) {
        if (!this.pesquisaForm.invalid) {
            this.addParams('consulta', this.mountFilter(filter));
            this.list();
        }
    };
    UsuarioListComponent.prototype.lixeira = function () {
        var _this = this;
        this.usuariosService.lixeira().subscribe(function (usuarios) {
            _this.load(usuarios);
        });
    };
    UsuarioListComponent.prototype.excluir = function () {
        var _this = this;
        var itens = [];
        this.checkboxSelecteds().forEach(function (x) {
            if (x)
                itens.push(x.id);
        });
        this.usuariosService.excluir({ id: itens }, itens).subscribe(function (res) {
            _this.list();
        });
    };
    UsuarioListComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario-list',
            templateUrl: './usuario-list.component.html',
            styleUrls: ['./usuario-list.component.scss']
        })
    ], UsuarioListComponent);
    return UsuarioListComponent;
}(list_abstract_1.ListAbstract));
exports.UsuarioListComponent = UsuarioListComponent;
