import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from "@angular/common";
import {Router} from "@angular/router";


@Component({
    selector: 'app-buttons',
    templateUrl: './buttons.component.html',
    styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

    @Input('itemSelected') itemSelected;

    @Input('title') title;

    @Input('subtitle') subtitle;

    @Input('smalltext') smalltext;

    @Input('countSelect') countSelect;

    @Input('hidebuttons') hidebuttons: any;

    @Output('eventsave') eventsave = new EventEmitter();

    @Output('remover') remover = new EventEmitter();

    @Output('restaurar') restaurar = new EventEmitter();

    @Input('icon') icon;


    constructor(private location: Location,
                private router: Router) {
    }

    ngOnInit() {
        //console.log(this.hidebuttons);
    }

    voltar() {
        this.location.back();
        return false;
    }

    checkUrlEdit() {
        const patt = /.*\/[0-9]+/g;
        if (!patt.test(this.router.url)) {
            return [this.itemSelected + '/edit'];
        }
        return ['edit'];
    }

    excluir() {
        this.remover.emit(true);
    }

    restore() {
        this.restaurar.emit(true);
    }

    save() {
        this.eventsave.emit(true);
        return false;
    }
}
