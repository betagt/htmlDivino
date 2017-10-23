import {ChangeDetectorRef, Component, Input, NgZone, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EstadosService} from "../../../localidades/service/estados.service";
import {CidadesService} from "../../../localidades/service/cidades.service";
import {PlanosService} from "../service/planos.service";


declare var $: any;

@Component({
    selector: 'app-tabela-preco-list',
    templateUrl: './tabela-preco-list.component.html',
    styleUrls: ['./tabela-preco-list.component.css']
})
export class TabelaPrecoListComponent extends ListAbstract implements OnInit {

    @Input('idPlano') idPlano: number;
    savePreco: FormGroup;
    cidades;
    estados;
    constructor(private planosService: PlanosService,
                private estadosService: EstadosService,
                private cidadesService: CidadesService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, planosService);
        super.form({
            'plano_tabela_precos.plano_id': [this.idPlano],
            'plano_tabela_precos.estado_id': [null, Validators.compose([Validators.required])],
            'plano_tabela_precos.cidade_id': [null, Validators.compose([Validators.required])],'field': ['id'],
            'order': ['desc']
        });
        this.loadEstados();
    }

    ngOnInit() {
        if (this.idPlano) {
            this.list();
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

    list(page = null) {
        if (this.includes.length > 0) {
            this.addParams('include', this.includes.join(','));
        }

        if (page) {
            this.addParams('page', page);
        }
        this.planosService.getTabelaPreco(this.idPlano, this.params)
            .subscribe(items => {
                this.load(items);
            });
    }

    excluir() {
        const itens = [];
        this.checkboxSelecteds().forEach(x => {
            if (x)
                itens.push(x.id);
        });
        this.planosService.excluirPreco({ids: itens}, itens).subscribe(res => {
            this.list();
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
