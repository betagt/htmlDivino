import {Component, OnInit, ChangeDetectorRef, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {UsuariosService} from '../usuarios.service';
import {Validators, FormBuilder, FormGroup, FormArray} from '@angular/forms';
import {CreateUpdateAbstract} from '../../../core/abstract/create-update.abstract';
import {ExtraValidators} from "../../../core/services/ExtraValidators.service";
import {AlertService} from "../../../core/services/alert.service.com";
import {DocumentoService} from "../../transporte/documentos/service/documento.service";
import {TipoDocumentoService} from "../../transporte/tipo-documento/service/tipo-documento.service";
import {UtilService} from "../../../core/services/util.service";
import {URLSearchParams} from "@angular/http";
import {isNullOrUndefined} from "util";
import {ContaService} from "../../transporte/contas/service/conta.service";

declare var $: any;

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.scss'],
    providers: [
        AlertService,
        DocumentoService,
        TipoDocumentoService,
        UtilService,
        ContaService
    ]
})
export class UsuarioFormComponent extends CreateUpdateAbstract implements OnInit {

    usuario: any;

    tipoDocumentos;

    _fb: FormBuilder;

    display = false;

    arquivos = [];

    perfil: any;

    status: any;

    estado_civil: any;

    maskData: any;

    constructor(private usuarioService: UsuariosService,
                private ngZone: NgZone,
                private documentoService: DocumentoService,
                private tipoDocumento: TipoDocumentoService,
                private alertService: AlertService,
                private contaService: ContaService,
                private utilService: UtilService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, usuarioService, ['/usuarios']);
        this.maskData = UtilService.maskData();
        this._fb = formBuilder;
    }

    ngOnInit() {
        this.perfil = [
            {
                label: 'Cliente',
                value: 'cliente'
            },
            {
                label: 'Fornecedor',
                value: 'fornecedor'
            }
        ];
        this.status = [
            {
                label: 'Ativo',
                value: 'ativo'
            },
            {
                label: 'Inativo',
                value: 'inativo'
            },
            {
                label: 'Bloqueado',
                value: 'bloqueado'
            }
        ];

        this.estado_civil = [
            {
                label: 'Solteiro',
                value: 'Solteiro'
            },
            {
                label: 'Casado',
                value: 'Casado'
            },
            {
                label: 'União Estável',
                value: 'União Estável'
            },
            {
                label: 'Divorciado/Separado',
                value: 'Divorciado/Separado'
            }
        ];
        super.form({
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email_confirmation': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'email_alternativo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'password': [null, Validators.compose([
                Validators.minLength(8),
                Validators.maxLength(255),
                ExtraValidators.conditional(
                    group => isNaN(this.routeParams.id),
                    Validators.required
                ),
            ])],
            'password_confirmation': [null, Validators.compose([
                Validators.minLength(8),
                Validators.maxLength(255),
                ExtraValidators.conditional(
                    group => group.controls.password.value != null,
                    Validators.required
                ),
            ])],
            'chk_newsletter': [0],
            'perfil': ['cliente'],
            'status': ['inativo'],
            'documentos': this._fb.array([]),
            'pessoa': this._fb.group({
                'sexo': [null],
                'cpf_cnpj': [null, Validators.compose([Validators.required])],
                'nec_especial': [null],
                'data_nascimento': [null, Validators.compose([Validators.required])],
                'rg': [null, Validators.compose([Validators.required])],
                'orgao_emissor': [null, Validators.compose([Validators.required])],
                'escolaridade': [null, Validators.compose([Validators.required])],
                'estado_civil': [null, Validators.compose([Validators.required])],
                'fantasia': [null],
                'contato': [null],
            })
        });
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            params.append('include', 'documentos,documentos.arquivos');
            this.usuarioService.show(this.routeParams.id, params).subscribe(usuario => {
                this.usuario = Object.assign({}, usuario);
                delete usuario.documentos;
                if (!isNullOrUndefined(usuario.pessoa)) {
                    usuario.pessoa.data.data_nascimento = UtilService.converterData(new Date(usuario.pessoa.data.data_nascimento));
                    this.saveForm.controls['pessoa'].patchValue(usuario.pessoa.data);
                }
                this.saveForm.patchValue(usuario);
                this.loadJquery();
            });
        }

        this.loadJquery();
        this.tipoDocumento.todosPessoa().subscribe(res => {
            this.tipoDocumentos = this.tipoDocumento.formatSelect(res, 'nome', 'id');
        });
    }

    initDocumento(): FormGroup {
        return this._fb.group({
            'transporte_tipo_documento_id': [null, Validators.compose([Validators.required])],
            'arquivos': [null, Validators.compose([Validators.required])],
            'nome': [null],
            'numero': [null],
            'data_vigencia_inicial': [null],
            'data_vigencia_fim': [null],
            'categoria_cnh': [null],
            'data_emissao': [null],
            'orgao_amissor': [null],
            'cnae': [null],
            'uf': [null],
            'curso': [null],
            'carga_horaria': [null],
            'data_conclusao': [null],
            'atividade_remunerada': [false],
            'nit': [null],
        });
    }

    loadArquivos(arquivos) {
        this.display = true;
        this.arquivos = arquivos;
    }

    addDocumento() {
        const control = < FormArray > this.saveForm.controls['documentos'];
        control.push(this.initDocumento());
    }

    delDocumento(index: number): void {
        const arrayControl = <FormArray>this.saveForm.controls['documentos'];
        arrayControl.removeAt(index);
    }

    removeDocumento(id, i) {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja realmente excluir este documento?',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(sucess => {
            this.documentoService.excluir({ids: [id]}, {ids: [id]}).subscribe(res => {
                AlertService.flashMessage('Aquivo excluído com sucesso!', 'bounceIn');
                this.usuario.documentos.data.splice(i, 1);
            });
        }, error => {
        });
    }

    changeListenerVeiculo(documento: any, $event) {
        const file = this.utilService.readThisMultiple($event.target);
        const control = documento.controls['arquivos'];
        const array = [];
        file.forEach(item => {
            item.onloadend = (e) => {
                array.push(item.result);
                control.setValue(array);
            };
        });
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            $('.selectpickeAr').selectpicker({
                noneSelectedText: 'Selecione'
            });
        });
    }

    changeListener($event): void {
        this.sendFile($event.target);
    }

    sendFile(inputValue) {
        const id = this.routeParams.id;
        const formData = new FormData();
        const file: File = inputValue.files[0];
        formData.append('imagem', file, file.name);

        this.usuarioService.sendFile(id, formData).subscribe(res => {
            this.usuario.imagem = res.data.imagem;
        });
    }

    aceitar(id, index) {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja realmente recusar este documento?',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(sucess => {
            this.documentoService.aceitar(id).subscribe(res => {
                AlertService.sucess('sucesso!', 'documento aceito!');
                this.usuario.documentos.data[index].status = 'aceito';
            });
        }, error => {
        });
    }

    recusar(id, index) {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja realmente recusar este documento?',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(sucess => {
            this.documentoService.recusar(id).subscribe(res => {
                AlertService.sucess('sucesso!', 'documento recusado!');
                this.usuario.documentos.data[index].status = 'invalido';
            });
        }, error => {
        });
    }

    contaPrincipal(id) {
        this.contaService.principal(this.routeParams.id, id).subscribe(contas => {
            this.usuario.contas = contas;
        });
    }
}
