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
var list_abstract_1 = require('../../../core/abstract/list.abstract.ts');
var forms_1 = require('@angular/forms');
var RotaAcessoListComponent = (function (_super) {
    __extends(RotaAcessoListComponent, _super);
    function RotaAcessoListComponent(rotaAcessoService, formBuilder, ref) {
        _super.call(this, formBuilder, ref);
        this.rotaAcessoService = rotaAcessoService;
        this._page = 1;
        this._params = new http_1.URLSearchParams();
    }
    RotaAcessoListComponent.prototype.ngOnInit = function () {
        _super.prototype.form.call(this, {
            'name': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'email': [null, forms_1.Validators.compose([forms_1.Validators.minLength(3), forms_1.Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['desc']
        });
        this.list();
    };
    RotaAcessoListComponent.prototype.list = function (page) {
        var _this = this;
        if (page === void 0) { page = null; }
        this.addParams('include', 'roles');
        if (page) {
            this.addParams('page', page);
        }
        this.rotaAcessoService.getRotas(this.params)
            .subscribe(function (usuarios) {
            _this.load(usuarios);
        });
    };
    RotaAcessoListComponent.prototype.load = function (usuarios) {
        this.usuarios = usuarios;
        this._total = usuarios.meta.pagination.total;
        this._page = usuarios.meta.pagination.current_page;
        this.arr = usuarios.data;
    };
    RotaAcessoListComponent.prototype.mountFilter = function (model) {
        var filter = {
            'filtro': {
                'users.name': model.name,
                'users.email': model.email
            },
            'order': model.field + ';' + model.order
        };
        return JSON.stringify(filter);
    };
    RotaAcessoListComponent.prototype.orderby = function (field) {
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
    RotaAcessoListComponent.prototype.pesquisar = function (filter) {
        if (!this.pesquisaForm.invalid) {
            this.addParams('consulta', this.mountFilter(filter));
            this.list();
        }
    };
    RotaAcessoListComponent.prototype.lixeira = function () {
        var _this = this;
        this.rotaAcessoService.lixeira().subscribe(function (usuarios) {
            _this.load(usuarios);
        });
    };
    RotaAcessoListComponent.prototype.excluir = function () {
        var _this = this;
        var itens = [];
        this.checkboxSelecteds().forEach(function (x) {
            if (x)
                itens.push(x.id);
        });
        this.rotaAcessoService.excluir({ id: itens }, itens).subscribe(function (res) {
            _this.list();
        });
    };
    RotaAcessoListComponent = __decorate([
        core_1.Component({
            selector: 'app-rota-acesso-list',
            templateUrl: './rota-acesso-list.component.html',
            styleUrls: ['./rota-acesso-list.component.css']
        })
    ], RotaAcessoListComponent);
    return RotaAcessoListComponent;
}(list_abstract_1.ListAbstract));
exports.RotaAcessoListComponent = RotaAcessoListComponent;
