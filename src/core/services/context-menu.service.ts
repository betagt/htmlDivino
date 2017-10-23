import {ComponentRef, ViewContainerRef, Injectable, ComponentFactoryResolver, EventEmitter} from '@angular/core';
import {EventManager} from '@angular/platform-browser';
import {ContextMenuOption, ContextMenuComponent} from '../menu/context-menu.component';

@Injectable()

export class ContextMenuService {

    private _menuAlreadyOn: boolean = false;

    private _currentContextMenu: ComponentRef<any>;

    viewContainerRef: ViewContainerRef

    showContextMenu(event: MouseEvent, options: ContextMenuOption[]): boolean {

        event.stopPropagation();

        if (this._menuAlreadyOn) {
            this._currentContextMenu.destroy();
            this._menuAlreadyOn = false;
        }

        let componentRef = this.viewContainerRef.createComponent(this._cfr.resolveComponentFactory(ContextMenuComponent))

        componentRef.instance.options = options;
        componentRef.location.nativeElement.getElementsByTagName('div')[0].style.left = event.clientX
        componentRef.location.nativeElement.getElementsByTagName('div')[0].style.top = event.clientY

        this._currentContextMenu = componentRef;
        this._menuAlreadyOn = true;

        let listener = this._eventManager.addGlobalEventListener('document', 'click', () => {

            this._currentContextMenu.destroy();
            this._menuAlreadyOn = false;
            listener();
        })


        return false;
    }

    constructor(private _cfr: ComponentFactoryResolver,
                private _eventManager: EventManager) {

    }

}
