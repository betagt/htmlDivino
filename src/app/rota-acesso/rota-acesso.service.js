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
var base_service_service_1 = require("../../core/base-service.service.ts");
var RotaAcessoService = (function (_super) {
    __extends(RotaAcessoService, _super);
    function RotaAcessoService(httpClienteSevice) {
        _super.call(this);
        this.httpClienteSevice = httpClienteSevice;
    }
    /**
     * Get all users
     **/
    RotaAcessoService.prototype.getRotas = function (params) {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso', params)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    /**
     * Get all users
     **/
    RotaAcessoService.prototype.lixeira = function () {
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso/lixeira', null)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    RotaAcessoService.prototype.show = function (id, params) {
        if (params === void 0) { params = null; }
        return this.httpClienteSevice.get('/api/v1/admin/rota_acesso/' + id, params)
            .map(function (res) {
            return res.json().data;
        })
            .catch(this.handleError);
    };
    RotaAcessoService.prototype.delete = function (url) {
        return this.httpClienteSevice.delete(url).map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    RotaAcessoService.prototype.deleteAll = function (url, params) {
        return this.httpClienteSevice.post(url, params).map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    RotaAcessoService.prototype.updateOrCreate = function (params, id) {
        if (id === void 0) { id = null; }
        var url = '/api/v1/admin/rota_acesso';
        if (id) {
            url = '/api/v1/admin/rota_acesso/' + id;
        }
        if (id) {
            return this.httpClienteSevice
                .put(url, params)
                .map(function (res) {
                return res.json();
            })
                .catch(this.handleError);
        }
        return this.httpClienteSevice
            .post(url, params)
            .map(function (res) {
            return res.json();
        })
            .catch(this.handleError);
    };
    RotaAcessoService.prototype.excluir = function (params, itens) {
        var url = '/api/v1/admin/rota_acesso';
        if (itens.length == 1) {
            return this.httpClienteSevice.delete(url + '/' + itens[0]);
        }
        return this.deleteAll(url + '/destroy-all', params);
    };
    RotaAcessoService = __decorate([
        core_1.Injectable()
    ], RotaAcessoService);
    return RotaAcessoService;
}(base_service_service_1.BaseServiceService));
exports.RotaAcessoService = RotaAcessoService;
