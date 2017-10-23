"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var CreateUpdateAbstract = (function () {
    function CreateUpdateAbstract(formBuilder, ref) {
        this.formBuilder = formBuilder;
        this.ref = ref;
        this.countSelect = 0;
        this.itemSelected = 0;
    }
    CreateUpdateAbstract.prototype.form = function (form) {
        this.saveForm = this.formBuilder.group(form);
    };
    CreateUpdateAbstract.prototype.ngOnChanges = function (e) {
        this.ref.markForCheck();
    };
    CreateUpdateAbstract.prototype.save = function (user, id) {
        if (id === void 0) { id = null; }
        if (!id)
            id;
    };
    CreateUpdateAbstract = __decorate([
        core_1.Injectable()
    ], CreateUpdateAbstract);
    return CreateUpdateAbstract;
}());
exports.CreateUpdateAbstract = CreateUpdateAbstract;
