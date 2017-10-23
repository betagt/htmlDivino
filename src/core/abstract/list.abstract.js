"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var ListAbstract = (function () {
    function ListAbstract(formBuilder, ref) {
        this.formBuilder = formBuilder;
        this.ref = ref;
        this.countSelect = 0;
        this.itemSelected = 0;
    }
    ListAbstract.prototype.form = function (form) {
        this.pesquisaForm = this.formBuilder.group(form);
    };
    ListAbstract.prototype.checkAll = function (ev) {
        if (!this.arr)
            return;
        this.arr.forEach(function (x) { return x.state = ev.target.checked; });
        this.count();
    };
    ListAbstract.prototype.ngOnChanges = function (e) {
        this.ref.markForCheck();
    };
    ListAbstract.prototype.isAllChecked = function () {
        if (!this.arr) {
            return;
        }
        return this.arr.every(function (_) { return _.state; });
    };
    ListAbstract.prototype.count = function () {
        return this.countSelect = this.checkboxSelecteds().length;
    };
    ListAbstract.prototype.checkboxSelecteds = function () {
        var _this = this;
        return this.arr.filter(function (opt) {
            if (opt.state == true)
                _this.itemSelected = opt.id;
            return (opt.state == true);
        });
    };
    ListAbstract.prototype.addParams = function (key, val) {
        this._params.set(key, val);
    };
    ListAbstract.prototype.removeParams = function (key) {
        this._params.delete(key);
    };
    Object.defineProperty(ListAbstract.prototype, "params", {
        get: function () {
            return this._params;
        },
        enumerable: true,
        configurable: true
    });
    ListAbstract = __decorate([
        core_1.Injectable()
    ], ListAbstract);
    return ListAbstract;
}());
exports.ListAbstract = ListAbstract;
