import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {SelectItem} from 'primeng/primeng';
import {EstadosService} from "../../../localidades/service/estados.service";
import {CidadesService} from "../../../localidades/service/cidades.service";
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service.com";
import {PlanosService} from "../service/planos.service";

declare var $: any;

@Component({
    selector: 'app-tabela-preco-form',
    templateUrl: './tabela-preco-form.component.html',
    styleUrls: ['./tabela-preco-form.component.css']
})
export class TabelaPrecoFormComponent extends CreateUpdateAbstract implements OnInit, OnChanges {

    @Input('idPlano') idPlano;
    @Input('idPreco') idPreco: number;
    cidades;
    estados: SelectItem[];
    tabelaDePreco;

    constructor(private planosService: PlanosService,
                private estadosService: EstadosService,
                private cidadesService: CidadesService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, planosService);
        super.form({
            'plano_id': [this.idPlano],
            'cidade_id': [null, Validators.compose([Validators.required])],
            'estado_id': [null, Validators.compose([Validators.required])],
            'valor': [null, Validators.compose([Validators.required])],
        });
        if (this.idPreco) {
            this.loadEstados();
        }
    }

    ngOnInit() {
    }

    ngOnChanges() {
        if (this.idPreco) {
            this.planosService.showTabelaPreco(this.idPreco).subscribe(res => {
                this.saveForm.patchValue({
                    cidade_id: res.cidade.id,
                    plano_id: res.plano_id,
                    estado_id: res.estado.id,
                    valor: res.valor
                });
                this.chageEstado(res.estado.id);
                this.tabelaDePreco = res;
            });
        }
    }

    loadEstados() {
        this.estadosService.selectEstados().subscribe(estados => {
            this.estados = estados;
        });
    }

    chageEstado(estadoId: number) {
        this.cidadesService.selectCidades(estadoId).subscribe(cidades => {
            this.cidades = cidades;
        });
    }

    saveTabelaPreco(value) {
        if (!this.saveForm.invalid) {
            value.plano_id = Number(this.idPlano);
            value.valor = Number(value.valor);
            this.planosService.cadastrarTabelaPreco(value, this.idPreco).subscribe(preco => {
                AlertService.seccessTime(
                    'Registro Atualizado!');
                this.clear();
            }, error => {
               const err = JSON.parse(error._body);
               AlertService.errorTime(
                   err.error.description);
            });
        }
    }

    private clear() {
        this.idPreco = null;
        this.cidades = [];
        this.saveForm.patchValue({});
    }

}
