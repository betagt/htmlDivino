import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ExtraValidators} from "../../../../core/services/ExtraValidators.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {Location} from "@angular/common";
import {isBoolean} from "util";
import {TipoDocumentoService} from "../service/tipo-documento.service";

@Component({
    selector: 'app-tipo-documento-form',
    templateUrl: './tipo-documento-form.component.html',
    styleUrls: ['./tipo-documento-form.component.css']
})
export class TipoDocumentoFormComponent extends CreateUpdateAbstract implements OnInit {

    formaPagamento;
    status;
    tipo;

    constructor(private tipoDocumentoService: TipoDocumentoService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, tipoDocumentoService, ['/transporte/tipo-documento']);
        this.status = [
            {
                label: 'Sim',
                value: true
            },
            {
                label: 'Não',
                value: false
            },
        ];
        this.tipo = [
            {
                label: 'Pessoa',
                value: 'pessoa'
            },
            {
                label: 'Veículo',
                value: 'veiculo'
            },
        ];
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(2), Validators.maxLength(255), Validators.required])],
            'descricao': [null, Validators.compose([Validators.maxLength(255), Validators.required])],
            'precisa_de_documento': [true],
            'possui_vencimento': false,
            'tipo': ['pessoa']
        });
        if (this.routeParams.id) {
            this.tipoDocumentoService.show(this.routeParams.id).subscribe(formaPagamento => {
                this.saveForm.patchValue(formaPagamento);
                this.formaPagamento = formaPagamento;
            });
            return;
        }
    }

}
