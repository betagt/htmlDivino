import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ExtraValidators} from "../../../../core/services/ExtraValidators.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {Location} from "@angular/common";
import {isBoolean} from "util";
import {TipoDocumentoService} from "../service/tipo-documento.service";
import {AlertService} from "../../../../core/services/alert.service.com";

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
                label: 'Motorista',
                value: 'fornecedor'
            },
            {
                label: 'Veículo',
                value: 'veiculo'
            },
            {
                label: 'Cliente',
                value: 'cliente'
            },
            {
                label: 'Taxista',
                value: 'taxista'
            },
            {
                label: 'Mototaxista',
                value: 'mototaxista'
            },
        ];
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(2), Validators.maxLength(255), Validators.required])],
            'descricao': [null, Validators.compose([Validators.maxLength(255), Validators.required])],
            'precisa_de_documento': [true],
            'possui_vencimento': false,
            'obrigatorio': false,
            'tipo': []
        });
        if (this.routeParams.id) {
            this.tipoDocumentoService.show(this.routeParams.id).subscribe(formaPagamento => {
                this.saveForm.patchValue(formaPagamento);
                this.formaPagamento = formaPagamento;
            });
            return;
        }
    }

    updateOrCreate(data) {
        if (!this.saveForm.invalid) {

            data.tipo = data.tipo.join(',');

            this.tipoDocumentoService.updateOrCreate(data, this.routeParams.id).subscribe(res => {
                if (this.redirect) {
                    this.router.navigate(this.redirect);
                } else {
                    AlertService.seccessTime(
                        'Registro Salvo!');
                }
            }, erro => {
                if (erro.status == 422) {
                    const response = JSON.parse(erro._body);
                    let text = '';
                    for (let erro in response) {
                        for (let msg in response[erro]) {
                            text += erro + ': ' + response[erro][msg] + '<br>';
                        }
                    }
                    AlertService.errorTime(text);
                }
            });
        }
    }

}
