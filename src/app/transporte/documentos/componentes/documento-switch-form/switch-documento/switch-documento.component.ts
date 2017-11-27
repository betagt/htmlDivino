import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
    selector: 'app-switch-documento',
    templateUrl: './switch-documento.component.html',
    styleUrls: ['./switch-documento.component.css']
})
export class SwitchDocumentoComponent implements OnInit {

    documento;

    catcnh;

    estados;

    coberturaVidas;

    coberturaTerceiros;

    @Output() documentoformChange = new EventEmitter();

    @Input()
    get documentoform() {
        return this.documento;
    }

    set documentoform(formanuncio) {
        this.documento = formanuncio;
        this.documentoformChange.emit(this.documento);
    }

    constructor() {
        this.catcnh = [
            {
                label: 'A',
                value: 'A'
            },
            {
                label: 'AB',
                value: 'AB'
            },
            {
                label: 'C',
                value: 'C'
            },
            {
                label: 'D',
                value: 'D'
            },
            {
                label: 'E',
                value: 'E'
            },
        ];
        this.coberturaVidas = [
            {
                label: 'Sim',
                value: 'sim'
            },
            {
                label: 'Não',
                value: 'nao'
            },
        ];
        this.coberturaTerceiros = [
            {
                label: 'Sim',
                value: 'sim'
            },
            {
                label: 'Não',
                value: 'nao'
            },
        ];
    }

    ngOnInit() {
    }

}
