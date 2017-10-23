import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {FormasPagamentoService} from "../service/formas-pagamento.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'app-formas-pagamento-detail',
    templateUrl: './formas-pagamento-detail.component.html',
    styleUrls: ['./formas-pagamento-detail.component.css']
})
export class FormasPagamentoDetailComponent extends DetailAbstract implements OnInit {

    constructor(private rotaAcessoService: FormasPagamentoService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(ref, location, activatedRoute, router, rotaAcessoService);
    }

    ngOnInit() {
        this.show(this.routeParams.id);
    }

}
