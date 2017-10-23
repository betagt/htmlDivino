import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {ServicoService} from "../service/servico.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TipoDocumentoService} from "../../tipo-documento/service/tipo-documento.service";

@Component({
    selector: 'app-servico-form',
    templateUrl: './servico-form.component.html',
    styleUrls: ['./servico-form.component.css'],
    providers: [
        TipoDocumentoService
    ],
    encapsulation: ViewEncapsulation.None
})
export class ServicoFormComponent extends CreateUpdateAbstract implements OnInit {
    tipodocumentos;
    tipodocumentosSelected;

    constructor(private servicoService: ServicoService,
                private tipoDocumentoService: TipoDocumentoService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, servicoService, ['/transporte/servico']);
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(2), Validators.maxLength(255), Validators.required])],
            'nome_similar': [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
            'tipo_documentos': [null],
        });
        this.tipoDocumentoService.todos().subscribe(res => {
            this.tipodocumentos = this.tipoDocumentoService.formatSelect(res, 'nome', 'id');
        });
        if (this.routeParams.id) {
            this.servicoService.show(this.routeParams.id).subscribe(servico => {
                this.saveForm.patchValue(servico);
                this.tipodocumentosSelected = (servico.hasOwnProperty('habilidades_values')) ? servico.habilidades_values : null;
            });
            return;
        }
    }

    changeHabilidades() {
        this.saveForm.controls['tipo_documentos'].setValue(this.tipodocumentosSelected);
    }

}
