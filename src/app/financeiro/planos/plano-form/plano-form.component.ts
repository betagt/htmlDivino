import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {PlanosService} from "../service/planos.service";

declare var $: any;

@Component({
    selector: 'app-plano-form',
    templateUrl: './plano-form.component.html',
    styleUrls: ['./plano-form.component.css']
})
export class PlanoFormComponent extends CreateUpdateAbstract implements OnInit {

    plano;

    constructor(private planoService: PlanosService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, planoService, ['/planos']);
        this.buttons.save = true;
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'dias': [null, Validators.compose([Validators.required])],
            'qtde_destaque': [null, Validators.compose([Validators.required])],
            'qtde_anuncio': [null, Validators.compose([Validators.required])],
            'tipo': [null, Validators.compose([Validators.required])],
            'valor': [null, Validators.compose([Validators.required])],
            'status': [null, Validators.compose([Validators.required])],
        });
        if (this.routeParams.id) {
            this.planoService.show(this.routeParams.id).subscribe(plano => {
                this.saveForm.patchValue(plano);
                this.plano = plano;
                this.loadJquery();
            });
            return;
        }
        this.loadJquery();
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            $('.selectpickeAr').selectpicker({
                noneSelectedText: 'Selecione'
            });
        });
    }
}
