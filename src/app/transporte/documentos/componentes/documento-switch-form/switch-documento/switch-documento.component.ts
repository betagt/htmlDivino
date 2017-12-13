import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {UtilService} from "../../../../../../core/services/util.service";

@Component({
    selector: 'app-switch-documento',
    templateUrl: './switch-documento.component.html',
    styleUrls: ['./switch-documento.component.css'],
    providers: [
        UtilService
    ]
})
export class SwitchDocumentoComponent implements OnInit {

    documento;

    catcnh;

    atividadeRemunerada;

    estados;

    coberturaVidas;

    coberturaTerceiros;

    vistoriador;

    alienado;

    maskData;

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
        this.maskData = UtilService.maskData();
        this.estados = UtilService.getEstados();
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
        this.atividadeRemunerada = [
            {
                label: 'Sim',
                value: true
            },
            {
                label: 'Não',
                value: false
            },
        ];
        this.vistoriador = [
            {
                label: 'Aliança',
                value: 'Aliança'
            },
            {
                label: 'Tocantins',
                value: 'Tocantins'
            },
        ];
        this.alienado = [
            {
                label: 'Sim',
                value: true
            },
            {
                label: 'Não Alienante',
                value: false
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
