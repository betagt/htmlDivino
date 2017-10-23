import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {FormasPagamentoService} from "../../formas-pagamento/service/formas-pagamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanoContratacoesService} from "../service/plano-contratacoes.service";
import {Location} from "@angular/common";

@Component({
    selector: 'app-plano-contratacao-detail',
    templateUrl: './plano-contratacao-detail.component.html',
    styleUrls: ['./plano-contratacao-detail.component.css']
})
export class PlanoContratacaoDetailComponent extends DetailAbstract implements OnInit {

    constructor(private planoContratacoesService: PlanoContratacoesService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(ref, location, activatedRoute, router, planoContratacoesService);
    }

    ngOnInit() {
        this.show(this.routeParams.id);
    }

}
