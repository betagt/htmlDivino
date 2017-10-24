import {
    ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, OnInit, ViewChild,
    ViewContainerRef
} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {DocumentoService} from "../service/documento.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {TipoDocumentoService} from "../../tipo-documento/service/tipo-documento.service";
import {AlertService} from "../../../../core/services/alert.service.com";
import {isNullOrUndefined} from "util";
import {UsuariosService} from "../../../usuarios/usuarios.service";

@Component({
    selector: 'app-documento-form',
    templateUrl: './documento-form.component.html',
    styleUrls: ['./documento-form.component.css'],
    providers: [TipoDocumentoService, AlertService, UsuariosService]
})
export class DocumentoFormComponent extends CreateUpdateAbstract implements OnInit {

    documento;

    status;

    catcnh;

    tipoDocumentos;

    usuarios;

    _fb;

    file: FormGroup;

    @ViewChild('arquivo') inputValue: ElementRef;

    // What to clone
    @ViewChild('clone') template;

    // Where to insert the cloned content
    @ViewChild('container', {read: ViewContainerRef}) container;

    constructor(private documentoService: DocumentoService,
                private tipoDocumento: TipoDocumentoService,
                private usuarioService: UsuariosService,
                private resolver: ComponentFactoryResolver,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, documentoService, ['/transporte/documento']);
        this.status = [
            {
                label: 'Aceito',
                value: 'aceito'
            },
            {
                label: 'Inválido',
                value: 'invalido'
            },
            {
                label: 'Pendete',
                value: 'pendente'
            },
        ];
        this.catcnh = [
            {
                label: 'A',
                value: 'A'
            },
            {
                label: 'AB',
                value: 'AB'
            },
            {
                label: 'C',
                value: 'C'
            },
            {
                label: 'D',
                value: 'D'
            },
            {
                label: 'E',
                value: 'E'
            },
        ];
        this._fb = formBuilder;
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(2), Validators.maxLength(255)])],
            'transporte_tipo_documento_id': [1, Validators.compose([Validators.required])],
            'user_id': [null, Validators.compose([Validators.required])],
            'numero': [null, Validators.compose([Validators.maxLength(255)])],
            'data_vigencia_inicial': [null],
            'data_vigencia_fim': [null],
            'categoria_cnh': ['A'],
            'arquivo': [null],
            'status': ['aceito']
        });
        this.file = this._fb.group({'arquivo': [null]});
        this.tipoDocumento.todos().subscribe(res => {
            this.tipoDocumentos = this.tipoDocumento.formatSelect(res, 'nome', 'id');
        });
        if (this.routeParams.id) {
            this.documentoService.show(this.routeParams.id).subscribe(documento => {
                this.saveForm.patchValue(documento);
                this.documento = documento;
            });
            return;
        }
    }

    cloneTemplate() {
        this.container.createEmbeddedView(this.template);
    }

    search(event) {
        this.usuarioService
            .selectList(event.query).subscribe(usuarios => {
            this.usuarios = usuarios;
        });
    }

    handleDropdown(event) {
        console.log(event);
    }

    selectdItem(selectedItem) {
        this.saveForm.controls['user_id'].setValue(selectedItem.id);
    }

    updateOrCreate(data) {
        if (!this.saveForm.invalid) {
            this.documentoService.updateOrCreate(data, this.routeParams.id).subscribe(res => {
                if (!isNullOrUndefined(this.file.value)) {
                    const formData = new FormData();
                    const file: File = this.inputValue.nativeElement.files[0];
                    formData.append('arquivo', file, file.name);
                    this.documentoService.sendFile(formData, res.id).subscribe(res => {
                        this.router.navigate(this.redirect);
                    });
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
