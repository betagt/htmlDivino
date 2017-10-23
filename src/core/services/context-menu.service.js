"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var context_menu_component_1 = require('../menu/context-menu.component');
var ContextMenuService = (function () {
    function ContextMenuService(_cfr, _eventManager) {
        this._cfr = _cfr;
        this._eventManager = _eventManager;
        this._menuAlreadyOn = false;
    }
    ContextMenuService.prototype.showContextMenu = function (event, options) {
        var _this = this;
        event.stopPropagation();
        if (this._menuAlreadyOn) {
            this._currentContextMenu.destroy();
            this._menuAlreadyOn = false;
        }
        var componentRef = this.viewContainerRef.createComponent(this._cfr.resolveComponentFactory(context_menu_component_1.ContextMenuComponent));
        componentRef.instance.options = options;
        componentRef.location.nativeElement.getElementsByTagName('div')[0].style.left = event.clientX;
        componentRef.location.nativeElement.getElementsByTagName('div')[0].style.top = event.clientY;
        this._currentContextMenu = componentRef;
        this._menuAlreadyOn = true;
        var listener = this._eventManager.addGlobalEventListener('document', 'click', function () {
            _this._currentContextMenu.destroy();
            _this._menuAlreadyOn = false;
            listener();
        });
        return false;
    };
    ContextMenuService = __decorate([
        core_1.Injectable()
    ], ContextMenuService);
    return ContextMenuService;
}());
exports.ContextMenuService = ContextMenuService;
