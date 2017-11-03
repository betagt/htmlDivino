import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-switch-documento',
    templateUrl: './switch-documento.component.html',
    styleUrls: ['./switch-documento.component.css']
})
export class SwitchDocumentoComponent implements OnInit {

    documento;

    @Output() documentoformChange = new EventEmitter();

    @Input()
    get documentoform() {
        return this.documento;
    }

    set documentoform(formanuncio) {
        this.documento = formanuncio;
        //this.documentoformChange.emit(this.documento);
    }

    constructor() {
    }

    ngOnInit() {
        console.log(this.documento);
    }

}
