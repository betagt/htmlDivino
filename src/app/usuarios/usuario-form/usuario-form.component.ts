import {Component, OnInit, ChangeDetectorRef, NgZone, ViewEncapsulation} from '@angular/core';
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
import {EstadosService} from "../../localidades/service/estados.service";
import {CidadesService} from "../../localidades/service/cidades.service";
import {GeoService} from "../../localidades/service/geo.service";

declare var $: any;

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.css'],
    providers: [
        AlertService,
        DocumentoService,
        TipoDocumentoService,
        UtilService,
        ContaService,
        EstadosService,
        CidadesService,
        GeoService
    ],
    encapsulation: ViewEncapsulation.None
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

    sexo;

    tipoSanguineo;

    cidades;

    estados;

    cepMask;

    dddMask;

    constructor(private usuarioService: UsuariosService,
                private ngZone: NgZone,
                private documentoService: DocumentoService,
                private tipoDocumento: TipoDocumentoService,
                private alertService: AlertService,
                private contaService: ContaService,
                private utilService: UtilService,
                private estadosService: EstadosService,
                private cidadesService: CidadesService,
                private geoService: GeoService,
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
                label: 'Passageiro',
                value: 'cliente'
            },
            {
                label: 'Motorista',
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
        this.tipoSanguineo = [
            {
                label: 'A+',
                value: 'A+'
            },
            {
                label: 'A-',
                value: 'A-'
            },
            {
                label: 'B+',
                value: 'B+'
            },
            {
                label: 'B-',
                value: 'B-'
            },
            {
                label: 'AB+',
                value: 'AB+'
            },
            {
                label: 'AB-',
                value: 'AB-'
            },
            {
                label: 'O+',
                value: 'O+'
            },
            {
                label: 'O-',
                value: 'O-'
            },
        ];
        this.sexo = [
            {
                label: 'Masculino',
                value: 1
            },
            {
                label: 'Feminino',
                value: 2
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
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email_confirmation': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'email_alternativo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
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
                'rg': [null],
                'orgao_emissor': [null],
                'escolaridade': [null, Validators.compose([Validators.required])],
                'estado_civil': [null, Validators.compose([Validators.required])],
                'tipo_sanguineo': [null, Validators.compose([Validators.required])],
                'fantasia': [null],
                'contato': [null],
                'contato_segudo': [null],
                'telefone_contato': [null],
                'telefone_segundo_contato': [null],
            }),
            'endereco': this._fb.group({
                'id': [null],
                'estado_id': [null, Validators.compose([Validators.required])],
                'cidade_id': [null, Validators.compose([Validators.required])],
                'cidade_name': [null, Validators.compose([Validators.required])],
                'estado_name': [null, Validators.compose([Validators.required])],
                'endereco': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
                'cep': [null, Validators.compose([Validators.required])],
                'numero': [null, Validators.compose([Validators.required])],
                'complemento': [null],
            }),
            'telefone': this._fb.group({
                'id': this._fb.array([
                    [null],
                    [null],
                ]),
                'ddd': this._fb.array([
                    [null, Validators.compose([Validators.required])],
                    [null],
                ]),
                'numero': this._fb.array([
                    [null, Validators.compose([Validators.required])],
                    [null],
                ]),
                'principal': this._fb.array([
                    true,
                    false,
                ]),
                'tipo': this._fb.array([
                    'celular',
                    'fixo',
                ]),
            }),
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
                if (!isNullOrUndefined(usuario.endereco)) {
                    this.saveForm.controls['endereco'].patchValue(usuario.endereco.data);
                }
                if (!isNullOrUndefined(usuario.telefones)) {
                    usuario.telefones.data.forEach((x, index) => {
                        const telefone: any = this.saveForm.controls['telefone'];
                        telefone.controls['id']['controls'][index].setValue(x.id);
                        telefone.controls['ddd']['controls'][index].setValue(x.ddd);
                        telefone.controls['numero']['controls'][index].setValue(UtilService.phoneMask(x.numero));
                        telefone.controls['principal']['controls'][index].setValue(x.principal);
                        telefone.controls['tipo']['controls'][index].setValue(x.tipo);
                    });
                }
                this.saveForm.patchValue(usuario);
                this.loadJquery();
            });
        }

        this.cepMask = UtilService.cepMasc();
        this.dddMask = UtilService.dddMasc();
        this.loadJquery();
        this.tipoDocumento.todosPessoa().subscribe(res => {
            this.tipoDocumentos = this.tipoDocumento.formatSelect(res, 'nome', 'id');
        });
        //this.loadEstados();
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
        window.open(arquivos.data[0].img);
        /*this.display = true;
        this.arquivos = arquivos;*/
    }

    addDocumento() {
        const control = < FormArray > this.saveForm.controls['documentos'];
        control.push(this.initDocumento());
    }

    delDocumento(index: number): void {
        const arrayControl = <FormArray>this.saveForm.controls['documentos'];
        arrayControl.removeAt(index);
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
        this.documentoService.aceitar(id).subscribe(res => {
            AlertService.flashMessage('Documento aceito', 'bounce', 'custom-success');
            this.usuario.documentos.data[index].status = 'aceito';
        });
    }

    recusar(id, index) {
        this.documentoService.recusar(id).subscribe(res => {
            AlertService.flashMessage('Documento recusado', 'bounce', 'custom-error');
            this.usuario.documentos.data[index].status = 'invalido';
        });
    }

    removeDocumento(id, i) {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja realmente excluir este documento?',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(sucess => {
            this.documentoService.excluir({ids: [id]}, {ids: [id]}).subscribe(res => {
                AlertService.flashMessage('Documento excluído', 'bounce', 'custom-success');
                this.usuario.documentos.data.splice(i, 1);
            });
        }, error => {
        });
    }

    contaPrincipal(id) {
        this.contaService.principal(this.routeParams.id, id).subscribe(contas => {
            this.usuario.contas = contas;
        });
    }

    chageEstado(estadoId: number) {
        //this.localizacao.estado = this.estados.filter(x => x.value == estadoId)[0];
        this.cidadesService
            .selectCidades(estadoId)
            .subscribe(cidades => {
                this.cidades = cidades;
            });
    }

    loadEstados() {
        this.estadosService.selectEstados().subscribe(estados => {
            this.estados = estados;
        });
    }

    chageCidade(cidadeId: number) {
        /*this.localizacao.cidade = this.cidades.filter(x => x.value == cidadeId)[0];
        this.bairroService
            .selectBairros(cidadeId)
            .subscribe(bairros => {
                this.bairros = bairros;
            });*/
    }

    pesquisaLocalidade() {
        const endereco: any = this.saveForm.controls['endereco'];
        const cep = endereco.controls['cep'].value;
        if (cep) {
            this.geoService.localidadeByCep(cep).subscribe(res => {
                endereco.controls['cidade_id'].setValue(res.cidade_id);
                endereco.controls['estado_id'].setValue(res.estado_id);
                endereco.controls['endereco'].setValue(res.logradouro);
                endereco.controls['estado_name'].setValue(res.estado_titulo);
                endereco.controls['cidade_name'].setValue(res.cidade_titulo);
                this.chageCidade(res.cidade_id);
            }, error => {
                AlertService.error('Não encontramos seu CEP ☹!', 'Use os correios para achar seu CEP click <a href="http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCepEndereco.cfm" target="_blank">aqui!</a>');
            });
        }
        return false;
    }
}
