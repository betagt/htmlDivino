import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-error-message2',
    templateUrl: './error-message2.component.html',
    styleUrls: ['./error-message2.component.css']
})
export class ErrorMessage2Component implements OnInit, OnChanges {

    erros: any = {};

    @Output() errosFormChange = new EventEmitter();

    @Input()
    get errosForm() {
        return this.erros;
    }

    set errosForm(formanuncio) {
        this.erros = formanuncio;
        this.errosFormChange.emit(this.erros);
    }

    constructor() {
    }

    ngOnInit() {
        console.log(this.errosForm);
    }

    ngOnChanges() {
        this.errosForm = this.erros;
    }

}
