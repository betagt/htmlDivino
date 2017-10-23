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
var base_service_service_1 = require("../base-service.service");
var CLIENT_ID = 1;
var SECRET = 'Z6UTO36NWuPGqTcIb7cdrO9BAGQSAu7AISBe2UEU';
var OauthLoginEndPointUrl = 'http://localhost:8000/api/v1/oauth/token';
var KEY_TOKEN = 'token';
var AuthService = (function (_super) {
    __extends(AuthService, _super);
    function AuthService(http, utilService) {
        _super.call(this);
        this.http = http;
        this.utilService = utilService;
        this.params = {};
        this.params = {
            'client_id': CLIENT_ID,
            'client_secret': SECRET,
            'grant_type': 'password'
        };
    }
    AuthService.prototype.getAccessToken = function (user) {
        var _this = this;
        var params = this.params;
        params['username'] = user.username;
        params['password'] = user.password;
        return this.http.post(OauthLoginEndPointUrl, this.utilService.queryBuilder(params))
            .map(function (resullt) {
            return _this.handleData(resullt);
        }, this.handleError);
    };
    AuthService.prototype.requestRefreshToken = function () {
        var _this = this;
        var params = {
            client_id: this.params['client_id'],
            client_secret: this.params['client_secret'],
            grant_type: 'refresh_token',
            refresh_token: this.getRefreshToken()
        };
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.post(OauthLoginEndPointUrl, params, { headers: headers })
            .map(function (resullt) {
            _this.handleData(resullt);
        })
            .catch(this.handleError);
    };
    AuthService.prototype.handleData = function (res) {
        var body = res.json();
        if (body.access_token) {
            this.setToken(JSON.stringify(body));
        }
        return body;
    };
    AuthService.prototype.getHeader = function () {
        var headers = new http_1.Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        if (this.isAuthenticated()) {
            headers.append('Authorization', "Bearer " + this.getToken());
        }
        return headers;
    };
    // Check user Authenticated
    AuthService.prototype.isAuthenticated = function () {
        return !!this.getToken();
    };
    AuthService.prototype.setAuthenticated = function (data) {
        return this.setItem('u', this.baseEncodeObj(data));
    };
    AuthService.prototype.setToken = function (token) {
        this.localStorage().setItem(KEY_TOKEN, token);
    };
    AuthService.prototype.getToken = function () {
        return this.getItemJson('access_token');
    };
    AuthService.prototype.getRefreshToken = function () {
        return this.getItemJson('refresh_token');
    };
    AuthService.prototype.setRotas = function (rotas) {
        this.setItemJson('r', rotas);
        return this;
    };
    AuthService.prototype.getRotas = function () {
        return JSON.parse(this.localStorage().getItem('r'));
    };
    AuthService.prototype.baseEncodeObj = function (obj) {
        return btoa(encodeURIComponent(JSON.stringify(obj)));
    };
    AuthService.prototype.baseDecodeObj = function (key) {
        return JSON.parse(decodeURIComponent(atob(this.getItem(key))));
    };
    AuthService.prototype.removeToken = function () {
        this.localStorage().removeItem(KEY_TOKEN);
    };
    AuthService.prototype.removeUser = function () {
        this.localStorage().removeItem('u');
    };
    AuthService.prototype.removeRotas = function () {
        this.localStorage().removeItem('r');
    };
    AuthService.prototype.setItemJson = function (key, obj) {
        this.localStorage().setItem(key, JSON.stringify(obj));
    };
    AuthService.prototype.setItem = function (key, obj) {
        this.localStorage().setItem(key, obj);
    };
    AuthService.prototype.getUser = function () {
        return this.baseDecodeObj('u');
    };
    AuthService.prototype.getItem = function (item) {
        return this.localStorage().getItem(item);
    };
    AuthService.prototype.getItemJson = function (item) {
        var json = JSON.parse(this.localStorage().getItem(KEY_TOKEN));
        if (json == null)
            return null;
        return json[item];
    };
    AuthService.prototype.logout = function () {
        this.removeUser();
        this.removeToken();
        this.removeRotas();
    };
    AuthService.prototype.localStorage = function () {
        return localStorage;
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}(base_service_service_1.BaseServiceService));
exports.AuthService = AuthService;
