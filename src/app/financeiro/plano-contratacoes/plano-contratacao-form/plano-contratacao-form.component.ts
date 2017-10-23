import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MenuItem, SelectItem} from "primeng/primeng";

import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {PlanoContratacoesService} from "../service/plano-contratacoes.service";
import {UsuariosService} from "../../../usuarios/usuarios.service";
import {PlanosService} from "../../planos/service/planos.service";
import {AnunciosService} from "../../../servicos/service/anuncios.service";
import {EstadosService} from "../../../localidades/service/estados.service";
import {CidadesService} from "../../../localidades/service/cidades.service";
import {BairroService} from "../../../localidades/service/bairro.service";
import {AlertService} from "../../../../core/services/alert.service.com";
import {UtilService} from "../../../../core/services/util.service";
import {PagseguroService} from "../../../../core/services/pagseguro.service";

declare var PagSeguroDirectPayment;

@Component({
    selector: 'app-plano-contratacao-form',
    templateUrl: './plano-contratacao-form.component.html',
    styleUrls: ['./plano-contratacao-form.component.css'],
    styles: [`
        .ui-widget-header .ui-state-default, .ui-widget-content .ui-state-default, .ui-state-default {
            border: 1px solid #d6d6d6;
            background: #ffffff;
            color: #555555;
        }

        .ui-chkbox .ui-chkbox-box {
            width: 20px;
            height: 20px;
            line-height: 17px;
            border-radius: 2px;
            text-align: center;
        }

        .ui-chkbox .ui-chkbox-box .ui-chkbox-icon {
            font-size: 18px;
        }

        div.ui-dropdown, div.ui-dropdown-trigger {
            border-top: 0;
            border-left: 0;
            border-right: 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .ui-selectbutton {
            display: flex;
            width: 100%;
        }

        .ui-buttonset .ui-button {
            width: 100%;
        }

        .ui-dropdown-panel .ui-dropdown-filter-container {
            width: 100%;
        }
    `],
    encapsulation: ViewEncapsulation.None,
    providers: [AlertService]
})
export class PlanoContratacaoFormComponent extends CreateUpdateAbstract implements OnInit {

    contratacao;

    anuncio;

    anunciante;

    usuarios;

    planos;

    cidades;

    bairros;

    planoAntigoId;

    estados: SelectItem[];

    private steps: MenuItem[];

    activeIndex = 0;

    selectPlano = null;

    _fb: FormBuilder;

    faturaForm: FormGroup;

    enderecoForm: FormGroup;

    cardForm: FormGroup;

    tiposFatura: SelectItem[];

    tipoFaturaSelected: any = 1;

    emitentes: SelectItem[];

    displayCard: boolean = false;

    displayBoleto: boolean = false;

    boletoLink: any = null;

    sendBoletoEmailForm: any;

    constructor(private planoContratacoesService: PlanoContratacoesService,
                private anunciosService: AnunciosService,
                private planosService: PlanosService,
                private usuarioService: UsuariosService,
                private estadosService: EstadosService,
                private cidadesService: CidadesService,
                private bairroService: BairroService,
                private alertService: AlertService,
                private pagseguroService: PagseguroService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, planoContratacoesService);
        this.buttons.save = true;
        this._fb = formBuilder;
        this.tiposFatura = [];
        this.tiposFatura.push({label: 'Pessoa Fisica', value: 1});
        this.tiposFatura.push({label: 'Pessoa Juridica', value: 2});

        this.emitentes = [];
        this.emitentes.push({label: 'Imobiliária', value: 'imobiliaria'});
        this.emitentes.push({label: 'Incorporadora', value: 'incorporadora'});
        this.emitentes.push({label: 'Construtora', value: 'construtora'});
        this.emitentes.push({label: 'Autônomo', value: 'autonomo'});
        this.emitentes.push({label: 'Anunciante', value: 'anunciante'});

    }

    ngOnInit() {

        super.form({
            'plano_id': [null, Validators.compose([Validators.required])],
            'anuncio_id': [null, Validators.compose([Validators.required])],
            'user_id': [null, Validators.compose([Validators.required])],
            'total': [null, Validators.compose([Validators.required])],
            'desconto': [null, Validators.compose([Validators.required])],
            'numero_fatura': [null],
            'pagina_user': [null],
        });

        this.faturaForm = this._fb.group({
            'razaosocial': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'tipo_emitente': [null, Validators.compose([Validators.required])],
            'cpf_cnpj': [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(11)])],
            'nomefantazia': [null],
            'inscricao_estadual': [null],
            'tipo_fatura': [this.tipoFaturaSelected],
            'creci': [null],
            'endereco_diferente': [false]
        });

        this.enderecoForm = this._fb.group({
            'estado_id': [null, Validators.compose([Validators.required])],
            'cidade_id': [null, Validators.compose([Validators.required])],
            'bairro_id': [null, Validators.compose([Validators.required])],
            'endereco': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'cep': [null, Validators.compose([Validators.required])],
            'numero': [null],
            'complemento': [null],
        });

        this.cardForm = this._fb.group({
            'num': [null, Validators.compose([Validators.required, Validators.minLength(15), Validators.maxLength(16)])],
            'cvv': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])],
            'monthExp': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(2)])],
            'yearExp': [null, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(4)])],
            'forma_pagamento': ['pagseguro', Validators.compose([Validators.required])],
            'code_contratacao': [null, Validators.compose([Validators.required])],
        });

        this.sendBoletoEmailForm = this._fb.group({
            'link': [null, Validators.compose([Validators.required])],
            'email': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
            'forma_pagamento': ['pagseguro', Validators.compose([Validators.required])],
            'code_contratacao': [null, Validators.compose([Validators.required])],
        });

        if (this.routeParams.anuncio) {
            this.loadAnuncio(this.routeParams.anuncio);
        } else {
            this.planoContratacoesService.show(this.routeParams.id)
                .subscribe(contratacao => {
                    this.saveForm.patchValue(contratacao);
                    this.contratacao = contratacao;
                    this.planoAntigoId = contratacao.plano_id;
                    this.loadAnuncio(this.contratacao.ultimo_anuncio.data.id);
                    console.log(this.contratacao.fatura.data);
                    this.faturaForm.patchValue(this.contratacao.fatura.data);
                });
        }

        this.steps = [
            {label: 'Selecione o plano'},
            {label: 'Dados da Fatura'},
            {label: 'Finalizar contratação'}
        ];

        this.loadEstados();
    }

    loadAnuncio(anuncio_id) {
        this.anunciosService.show(anuncio_id).subscribe(anuncio => {
            this.anuncio = anuncio;
            this.anunciante = anuncio.anunciante.data;
            this.saveForm.controls['anuncio_id'].setValue(this.anuncio.id);
            if (!this.routeParams.id) {
                this.faturaForm.controls['razaosocial'].setValue(anuncio.anunciante_nome);
                this.saveForm.controls['user_id'].setValue(this.anunciante.id);
            }

            this.planosService.getByCidadeEstado(
                anuncio.endereco.data.cidade_id,
                anuncio.endereco.data.estado_id).subscribe(planos => {
                this.planos = planos;
                if (!this.routeParams.anuncio) {
                    this.planos.data.forEach(x => {
                        if (x.id == this.contratacao.plano_id) {
                            x.state = true;
                            this.selectPlano = x;
                        }
                    });
                }
            });
        });
    }

    loadEstados() {
        this.estadosService.selectEstados().subscribe(estados => {
            this.estados = estados;
        });
    }

    chageEstado(estadoId: number) {
        this.cidadesService.selectCidades(estadoId).subscribe(cidades => {
            this.cidades = cidades;
        });
    }

    chageCidade(cidadeId: number) {
        this.bairroService.selectBairros(cidadeId).subscribe(bairros => {
            this.bairros = bairros;
        });
    }

    search(event) {
        this.usuarioService.selectList(event.query).subscribe(usuarios => {
            this.usuarios = usuarios;
        });
    }

    handleDropdown(event) {
        console.log(event);
    }

    animate(plano) {
        this.planos.data.forEach(x => {
            x.state = false;
            if (x.id == plano.id) {
                x.state = true;
            }
        });
    }

    urlReplace(nome) {
        this.saveForm.controls['pagina_user'].setValue('/' + UtilService.urlSlug(nome))
    }

    checkStep(step): boolean {
        return this.activeIndex == step;
    }

    tipoPessoaAlterada(ev): void {
        this.tipoFaturaSelected = ev.value;
    }

    isPessoaJuridica(): boolean {
        return this.tipoFaturaSelected == 2;
    }

    stepDadosDaFatura() {
        this.activeIndex = 1;
        this.pagseguroService.getMethodsPayments(this.selectPlano.valor);
    }

    updateOrCreate(data) {
        let proximo = 2;
        if (!this.validateForm()) {
            this.alertService.confirm({
                title: 'Confirmação!',
                text: 'Todos os dados da fatura estao corretos?',
                cancelButtonText: 'Não, Voltar e revisar',
                confirmButtonText: (this.routeParams.id)?'Sim, Atualizar':'Sim, Contratar',
            }).then(sucess => {
                this.enviarContratacao(data);
            }, error => {
            });
            return;
        }
        this.activeIndex = proximo;
    }

    private enviarContratacao(data) {
        let formData: any = {};
        this.saveForm.controls['plano_id'].setValue(this.selectPlano.id);
        formData.contratacao = this.saveForm.value;
        formData.fatura = this.faturaForm.value;
        formData.endereco = this.enderecoForm.value;
        this.planoContratacoesService.updateOrCreate(formData, this.routeParams.id).subscribe(contratacao => {
            this.contratacao = contratacao;
            this.cardForm.controls['code_contratacao'].setValue(contratacao.id);
            console.log(this.planoAntigoId);
            if (this.routeParams.id && this.planoAntigoId == contratacao.plano_id) {
                AlertService.sucess('Alerta!', 'Dados da Contratação Atualizada!');
                this.voltarContratacao();
                return;
            }
            this.alertService.confirm({
                title: 'Fatura #' + contratacao.id + '?',
                text: 'deseja realizar pagamento ou voltar para a lista de contratações.',
                cancelButtonText: 'Voltar a listagem',
                confirmButtonText: 'Realizar pagamento',
            }).then(sucess => {
                this.activeIndex = 2;
            }, error => {
                this.voltarContratacao();
            });
        });
    }

    toggleCardModal(): void {
        this.displayCard = !this.displayCard;
    }

    toggleBoletoModal() {
        if (!this.boletoLink) {
            this.pagseguroService.boletoGenerate('pagseguro', this.contratacao.id)
                .subscribe(response => {
                    this.openModalBoleto();
                    this.boletoLink = response['link'];
                }, error => {
                    AlertService.error('Erro!', 'Não foi possivel gerar o boleto tente novamente mais tarde!');
                });
            return;
        }
        this.openModalBoleto();
    }

    private openModalBoleto() {
        this.displayBoleto = !this.displayBoleto;
    }

    voltarContratacao() {
        this.router.navigate(['/plano-contratacoes']);
    }

    paymentCreditCard(data) {
        this.displayCard = false;
        this.pagseguroService.paymentCreditCard(data)
            .getPaymentSendEmitter()
            .subscribe(success => {
                AlertService
                    .sucess('Alerta!', 'Transação realizada, aguardando aprovação!')
                    .then(success => {
                        this.voltarContratacao();
                    });
            }, error => {
                this.displayCard = true;
                switch (error.status) {
                    case 'invalid creditcard data':
                        AlertService.error('Alerta!', 'Dados do cartão são inválidos!');
                        break;
                    default:
                        AlertService.error('Alerta!', 'transação não autorizada!');
                        break;
                }
            });
    }

    sendBoletoEmail(data) {
        this.planoContratacoesService.sendBoletoEmail(data).subscribe(response => {

        });
    }

    validateForm(): boolean {
        if (this.faturaForm.controls['endereco_diferente'].value) {
            return this.saveForm.invalid && this.faturaForm.invalid && this.enderecoForm.invalid;
        }
        return this.saveForm.invalid && this.faturaForm.invalid;
    }
}
