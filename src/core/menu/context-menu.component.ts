import {Component, Input, EventEmitter, Output} from '@angular/core';

export interface ContextMenuOption {
    text?: string;
    action?: () => void;
    rota?: string;
    icon?: string;
    disabled?: boolean;
    child?: any;
}

@Component({
    selector: 'context-menu',
    templateUrl: './context-menu.service.html',
    styleUrls: ['./context-menu.service.css']
})

export class ContextMenuComponent {

    @Input() options: ContextMenuOption[] = [];

    itemClicked(i: number) {
        if (this.options[i].action) {
            this.options[i].action();
        }
    }

}