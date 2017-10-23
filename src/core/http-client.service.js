"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var rxjs_1 = require('rxjs');
var OauthLoginEndPointUrl = 'http://localhost:8000';
var HttpClientService = (function () {
    function HttpClientService(http, authService, preloaderService) {
        this.http = http;
        this.authService = authService;
        this.preloaderService = preloaderService;
        this.headers = null;
        this.url = OauthLoginEndPointUrl;
    }
    HttpClientService.prototype.addHeader = function (key, value) {
        this.headers.append(key, value);
        return this;
    };
    HttpClientService.prototype.removeHeader = function (key) {
        this.headers.delete(key);
        return this;
    };
    HttpClientService.prototype.getUrlDefault = function () {
        return this.url;
    };
    HttpClientService.prototype.setUrlDefault = function (url) {
        this.url = url;
        return this;
    };
    HttpClientService.prototype.getHeaders = function () {
        if (this.headers == null) {
            this.headers = this.authService.getHeader();
        }
        return this.headers;
    };
    HttpClientService.prototype.get = function (url, params) {
        if (params === void 0) { params = null; }
        if (!params)
            params = new http_1.URLSearchParams();
        return this.intercept(this.http.get(this.url + url, {
            headers: this.getHeaders(),
            search: params
        }));
    };
    HttpClientService.prototype.post = function (url, data) {
        return this.intercept(this.http.post(this.url + url, data, {
            headers: this.getHeaders()
        }));
    };
    HttpClientService.prototype.put = function (url, data) {
        var headers = this.getHeaders();
        headers.set('Method', 'PUT');
        return this.http.put(this.url + url, data, {
            headers: headers
        });
    };
    HttpClientService.prototype.delete = function (url) {
        return this.http.delete(this.url + url, {
            headers: this.getHeaders()
        });
    };
    /**
     * Request interceptor.
     */
    HttpClientService.prototype.requestInterceptor = function (preloaderType) {
        if (preloaderType === void 0) { preloaderType = 'full'; }
        this.preloaderService.showPreloader(preloaderType);
    };
    /**
     * Response interceptor.
     */
    HttpClientService.prototype.responseInterceptor = function (preloaderType) {
        if (preloaderType === void 0) { preloaderType = 'full'; }
        this.preloaderService.hidePreloader(preloaderType);
    };
    HttpClientService.prototype.intercept = function (observable) {
        var _this = this;
        this.requestInterceptor();
        return observable.catch(function (err, source) {
            if (err.status == 401) {
                return _this.authService.requestRefreshToken()
                    .flatMap(function (authenticationResult) {
                    return _this.removeHeader('authorization')
                        .addHeader('Authorization', "Bearer " + _this.authService.getToken())
                        .get(err.url.replace(OauthLoginEndPointUrl, ''));
                });
            }
            else {
                return rxjs_1.Observable.throw(err);
            }
        }).do(function (res) {
            _this.onSubscribeSuccess(res);
        }, function (error) {
            _this.onSubscribeError(error);
        }).finally(function () {
            _this.onFinally();
        });
    };
    /**
     * onFinally
     */
    HttpClientService.prototype.onFinally = function (preloaderType) {
        if (preloaderType === void 0) { preloaderType = 'full'; }
        this.responseInterceptor(preloaderType);
    };
    /**
     * onSubscribeSuccess
     * @param res
     */
    HttpClientService.prototype.onSubscribeSuccess = function (res) {
    };
    /**
     * onSubscribeError
     * @param error
     */
    HttpClientService.prototype.onSubscribeError = function (error) {
    };
    HttpClientService = __decorate([
        core_1.Injectable()
    ], HttpClientService);
    return HttpClientService;
}());
exports.HttpClientService = HttpClientService;
