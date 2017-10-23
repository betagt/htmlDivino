import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from '../../../core/abstract/detail.abstract';
import {RotaAcessoService} from '../rota-acesso.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from "@angular/common";

@Component({
    selector: 'app-rota-acesso-detail',
    templateUrl: './rota-acesso-detail.component.html',
    styleUrls: ['./rota-acesso-detail.component.css']
})
export class RotaAcessoDetailComponent extends DetailAbstract implements OnInit {

    constructor(private rotaAcessoService: RotaAcessoService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(ref, location, activatedRoute, router, rotaAcessoService);
    }

    ngOnInit() {
        this.params.set('include', 'roles');
        this.show(this.routeParams.id);
    }

}
