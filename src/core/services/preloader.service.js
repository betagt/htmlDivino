"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PreloaderService = (function () {
    function PreloaderService() {
    }
    PreloaderService.prototype.getPreloaderCount = function (preloaderType) {
        if (preloaderType === void 0) { preloaderType = 'full'; }
        if (preloaderType === 'full') {
            return PreloaderService.fullLoadingCount;
        }
        else if (preloaderType === 'small') {
            return PreloaderService.smallLoadingCount;
        }
    };
    PreloaderService.prototype.showPreloader = function (preloaderType) {
        if (preloaderType === void 0) { preloaderType = 'full'; }
        if (preloaderType === 'full') {
            PreloaderService.fullLoadingCount++;
        }
        else if (preloaderType === 'small') {
            PreloaderService.smallLoadingCount++;
        }
    };
    PreloaderService.prototype.hidePreloader = function (preloaderType) {
        if (preloaderType === void 0) { preloaderType = 'full'; }
        if (preloaderType === 'full') {
            PreloaderService.fullLoadingCount--;
        }
        else if (preloaderType === 'small') {
            PreloaderService.smallLoadingCount--;
        }
    };
    PreloaderService.fullLoadingCount = 0;
    PreloaderService.smallLoadingCount = 0;
    PreloaderService = __decorate([
        core_1.Injectable()
    ], PreloaderService);
    return PreloaderService;
}());
exports.PreloaderService = PreloaderService;
