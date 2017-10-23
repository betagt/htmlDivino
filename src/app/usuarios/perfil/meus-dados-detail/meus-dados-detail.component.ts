import {Component, ElementRef, NgZone, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {UsuariosService} from "../../usuarios.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ExtraValidators} from "../../../../core/services/ExtraValidators.service";
import {AlertService} from "../../../../core/services/alert.service.com";
import {isNullOrUndefined} from "util";
import {DocumentoService} from "../../../transporte/documentos/service/documento.service";
import {TipoDocumentoService} from "../../../transporte/tipo-documento/service/tipo-documento.service";
import {ServicoService} from "../../../transporte/servicos/service/servico.service";
import {UtilService} from "../../../../core/services/util.service";
import {VeiculoService} from "../../veiculo.service";
import {MarcaCarroService} from "../../services/marca-carro.service";
import {ModeloCarroService} from "../../services/modelo-carro.service";

declare var $: any;

@Component({
    selector: 'app-meus-dados-detail',
    templateUrl: './meus-dados-detail.component.html',
    styleUrls: ['./meus-dados-detail.component.css'],
    encapsulation: ViewEncapsulation.None,
    providers: [
        DocumentoService,
        TipoDocumentoService,
        ServicoService,
        UtilService,
        VeiculoService,
        MarcaCarroService,
        ModeloCarroService
    ]
})
export class MeusDadosDetailComponent implements OnInit {
    usuario;
    saveForm: FormGroup;
    _fbSenha: FormGroup;
    _fbPessoa: FormGroup;
    _fbDocumento: FormGroup;
    _fbVeiculo: FormGroup;
    file: FormGroup;
    documento;
    documentos;
    meusVeiculos;
    tipoDocumentos;
    marcasCarro;
    modelosCarro;
    cores;
    @ViewChild('senhaButton') selectRef: ElementRef;
    @ViewChild('perfilButton') selectRefPerfil: ElementRef;
    @ViewChild('arquivo') inputValue: ElementRef;

    constructor(private _usuarioService: UsuariosService,
                private documentoService: DocumentoService,
                private tipoDocumento: TipoDocumentoService,
                private marcaCarroService: MarcaCarroService,
                private modeloCarroService: ModeloCarroService,
                private utilService: UtilService,
                private servicoService: ServicoService,
                private veiculoService: VeiculoService,
                private formBuilder: FormBuilder,
                private ngZone: NgZone) {
    }

    ngOnInit() {

        this.saveForm = this.formBuilder.group({
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email_alternativo': [
                null,
                Validators.compose([
                    Validators.minLength(3),
                    Validators.maxLength(255)
                ])],
            'chk_newsletter': [0]
        });

        this._fbPessoa = this.formBuilder.group({
            'sexo': [null, Validators.compose([])],
            'cpf_cnpf': [null, Validators.compose([])],
            'nec_especial': [null, Validators.compose([])],
            'data_nascimento': [null, Validators.compose([])],
            'rg': [null, Validators.compose([])],
            'orgao_emissor': [null, Validators.compose([])],
            'escolaridade': [null, Validators.compose([])],
            'estado_civil': [null, Validators.compose([])],
            'fantasia': [null, Validators.compose([])],
            'contato': [null, Validators.compose([])],
        });
        this._fbVeiculo = this.formBuilder.group({
            'transporte_marca_carro_id': [null, Validators.compose([])],
            'transporte_modelo_carro_id': [null, Validators.compose([])],
            'ano': [null, Validators.compose([])],
            'placa': [null, Validators.compose([])],
            'cor': [null, Validators.compose([])],
            'arquivo': [null, Validators.compose([])],
        });

        this._fbDocumento = this.formBuilder.group({
            'transporte_tipo_documento_id': [1, Validators.compose([Validators.required])],
            'arquivo': [null],
        });
        this.file = this.formBuilder.group({'arquivo': [null]});
        this._fbSenha = this.formBuilder.group({
            'old_password': [null, Validators.compose([
                Validators.required
            ])],
            'new_password': [null, Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(255)
            ])],
            'new_password_confirmation': [null, Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(255),
                ExtraValidators.conditional(
                    group => group.controls.new_password.value != null,
                    Validators.required
                ),
            ])],
        });
        this.tipoDocumento.todos().subscribe(res => {
            this.tipoDocumentos = this.tipoDocumento.formatSelect(res, 'nome', 'id');
        });
        this.marcaCarroService.todos(true).subscribe(marcas => {
            this.marcasCarro = marcas;
        });
        this.veiculoService.cores(true).subscribe(res => {
            this.cores = res;
        });
        this.listDocumentos();
        this.listVeiculos();
        this._usuarioService.getUserPerfil().subscribe(usuario => {
            if (!isNullOrUndefined(usuario.pessoa)) {
                usuario.pessoa.data.data_nascimento = new Date(usuario.pessoa.data.data_nascimento);
                this._fbPessoa.patchValue(usuario.pessoa.data);
            }
            this.saveForm.patchValue(usuario);
            this.usuario = usuario;
            this.loadJquery();
        });
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            $('.selectpickerAr').selectpicker({
                noneSelectedText: 'Selecione'
            });
        });
    }

    loadModelos($event) {
        this.modeloCarroService.todosByMarca($event.value, true).subscribe(marcas => {
            this.modelosCarro = marcas;
        });
    }

    update(data) {
        if (!this.saveForm.invalid) {
            this._usuarioService.changePerfil(data).subscribe(res => {
                AlertService.seccessTime('Alerta!', 'Senha alterada com sucesso!');
                this.selectRefPerfil.nativeElement.click();
            }, error => {
                AlertService.error('Erro!', error._body);
            });
        }
    }

    updatePessoa(data) {
        if (!this.saveForm.invalid) {
            this._usuarioService.changePessoa(data).subscribe(res => {
                AlertService.seccessTime('Alerta!', 'Dados alterado com sucesso!');
                this.saveForm.reset();
                ///this.selectRefPerfil.nativeElement.click();
            }, error => {
                AlertService.error('Erro!', error._body);
            });
        }
    }

    updateVeiculo(data) {
        if (!this._fbVeiculo.invalid) {
            this.veiculoService.enviar(data).subscribe(res => {
                AlertService.seccessTime('Alerta!', 'Dados alterado com sucesso!');
                this._fbVeiculo.reset();
                this.listVeiculos();
            }, error => {
                AlertService.error('Erro!', error._body);
            });
        }
    }

    chengeupdate(id, $event) {
        const file = this.utilService.readThis($event.target);
        file.onloadend = (e) => {
            this.veiculoService.atualizar({'arquivo': file.result}, id).subscribe(res => {
                AlertService.seccessTime('Alerta!', 'Dados alterado com sucesso!');
                this.listVeiculos();
            }, error => {
                AlertService.error('Erro!', error._body);
            });
        };
    }

    /*changeListener($event): void {
     this.sendFile($event.target);
     }*/

    sendFile(inputValue) {
        const formData = new FormData();
        const file: File = inputValue.files[0];
        formData.append('imagem', file, file.name);

        this._usuarioService.sendFileUser(formData).subscribe(res => {
            this.usuario.imagem = res.data.imagem;
        });
    }

    changeListener($event) {
        const file = this.utilService.readThis($event.target);
        file.onloadend = (e) => this._fbDocumento.controls['arquivo'].setValue(file.result);
    }

    changeListenerVeiculo($event) {
        const file = this.utilService.readThis($event.target);
        file.onloadend = (e) => this._fbVeiculo.controls['arquivo'].setValue(file.result);
    }

    updateSenha(data) {
        if (!this._fbSenha.invalid) {
            this._usuarioService.changePassword(data).subscribe(res => {
                AlertService.seccessTime('Alerta!', 'Senha alterada com sucesso!');
                this.selectRef.nativeElement.click();
            }, error => {
                AlertService.error('Erro!', error._body);
            });
        }
    }

    listDocumentos() {
        this.documentoService.todosByUser().subscribe(res => {
            this.documentos = res;
        });
    }

    listVeiculos() {
        this.veiculoService.meusVeiculos().subscribe(res => {
            this.meusVeiculos = res;
        });
    }

    uploadDocumentos(data) {
        if (!this._fbDocumento.invalid) {
            this.documentoService.uploadDocumento(data).subscribe(res => {
                AlertService.seccessTime('Alerta!', 'Arquivo enviado para analise!');
                this.listDocumentos();
                /*if (!isNullOrUndefined(this.file.value)) {
                 const formData = new FormData();
                 const file: File = this.inputValue.nativeElement.files[0];
                 formData.append('arquivo', file, file.name);
                 this.documentoService.sendFile(formData, res.id).subscribe(res => {
                 this.listDocumentos();
                 });
                 }*/
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
