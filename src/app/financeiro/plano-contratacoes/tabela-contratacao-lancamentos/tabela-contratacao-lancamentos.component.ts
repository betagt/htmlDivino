import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EstadosService} from "../../../localidades/service/estados.service";
import {CidadesService} from "../../../localidades/service/cidades.service";
import {PlanoContratacoesService} from "../service/plano-contratacoes.service";
import {FormasPagamentoService} from "../../formas-pagamento/service/formas-pagamento.service";


declare var $: any;

@Component({
    selector: 'app-tabela-contratacao-lancamentos',
    templateUrl: './tabela-contratacao-lancamentos.component.html',
    styleUrls: ['./tabela-contratacao-lancamentos.component.css']
})
export class TabelaContratacaoLancamentoComponent extends ListAbstract implements OnInit {

    @Input('idContratacao') idContratacao: number;
    savePreco: FormGroup;
    cidades;
    estados;
    formaPagamentos;

    constructor(private planoContratacoesService: PlanoContratacoesService,
                private formasPagamentoService: FormasPagamentoService,
                private estadosService: EstadosService,
                private cidadesService: CidadesService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, planoContratacoesService);
        super.form({
            'plano_tabela_precos.plano_id': [this.idContratacao],
            'lancamentos.forma_pagamento_id': [null, Validators.compose([Validators.required])],
            'lancamentos.codigo': [null, Validators.compose([Validators.required])],
            'lancamentos.valor': [null, Validators.compose([Validators.required])],
            'field': ['id'],
            'order': ['desc']
        });
        this.loadFormaPagamentos();
    }

    ngOnInit() {
        if (this.idContratacao) {
            this.list();
        }
    }

    loadFormaPagamentos() {
        this.formasPagamentoService.formaPagamentoAtivas().subscribe(formaPagamentos => {
            this.formaPagamentos = formaPagamentos;
        });
    }

    list(page = null) {
        if (this.includes.length > 0) {
            this.addParams('include', this.includes.join(','));
        }

        if (page) {
            this.addParams('page', page);
        }
        this.planoContratacoesService.getListLancamentos(this.idContratacao, this.params)
            .subscribe(items => {
                this.load(items);
            });
    }


    pesquisar(model) {
        if (!this.pesquisaForm.invalid) {
            const consulta = {
                'filtro': model,
                'order': model.field + ';' + model.order
            }
            this.addParams('consulta', JSON.stringify(consulta));
            this.list();
        }
    }
}
