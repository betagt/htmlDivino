import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {FormasPagamentoService} from "../service/formas-pagamento.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {ExtraValidators} from "../../../../core/services/ExtraValidators.service";

@Component({
    selector: 'app-formas-pagamento-form',
    templateUrl: './formas-pagamento-form.component.html',
    styleUrls: ['./formas-pagamento-form.component.css']
})
export class FormasPagamentoFormComponent extends CreateUpdateAbstract implements OnInit {

    formaPagamento;
    status;

    constructor(private formasPagamentoService: FormasPagamentoService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, formasPagamentoService, ['/formas-de-pagamento']);
        this.status = [
            {
                label: 'Ativo',
                value: true
            },
            {
                label: 'Inativo',
                value: false
            },
        ];
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'taxa': [null, Validators.compose([
                Validators.required,
                ExtraValidators.conditional(
                    group => isNaN(group.controls.taxa),
                    Validators.required
                )
            ])],
            'status': [null, Validators.compose([Validators.required])]
        });
        if (this.routeParams.id) {
            this.formasPagamentoService.show(this.routeParams.id).subscribe(formaPagamento => {
                this.saveForm.patchValue(formaPagamento);
                this.formaPagamento = formaPagamento;
            });
            return;
        }
    }

}
