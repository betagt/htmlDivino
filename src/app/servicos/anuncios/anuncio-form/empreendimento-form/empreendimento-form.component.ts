import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormArray, FormGroup, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {UsuariosService} from "../../../../usuarios/usuarios.service";
import {AlertService} from "../../../../../core/services/alert.service.com";
import {SelectItem} from "primeng/primeng";
import {FinalidadeService} from "../../../service/finalidade.service";
import {EstadosService} from "../../../../localidades/service/estados.service";
import {CidadesService} from "../../../../localidades/service/cidades.service";
import {BairroService} from "../../../../localidades/service/bairro.service";
import {ExtraValidators} from "../../../../../core/services/ExtraValidators.service";
import {CaracteristicasService} from "../../../service/caracteristicas.service";
import {UtilService} from "../../../../../core/services/util.service";

@Component({
    selector: 'app-empreendimento-form',
    templateUrl: './empreendimento-form.component.html',
    styleUrls: ['./empreendimento-form.component.css'],
    styles: [
            `
            .tipo-height {
                height: 271px;
            }

            .bg_empreendimento {
                background: url(../../../../assets/img/empreendimento_bg.jpg);
            }

            .bg_imovel {
                background: url(../../../../assets/img/imovel_bg.jpg);
            }

            .pt-inner .pti-header .ptih-title {
                background-color: rgba(0, 0, 0, .6);
            }
        `
    ]
})
export class EmpreendimentoFormComponent implements OnInit {

    @Input('anuncio') anuncio;

    @Output('proximo') proximo = new EventEmitter<any>();

    @Output('voltar') voltar = new EventEmitter<any>();

    @Output('localtion') localtion = new EventEmitter<any>();

    imovelForm: FormGroup;

    enderecoForm: FormGroup;

    condicaoComercialForm: FormGroup;

    usuarios;

    pretensao: SelectItem[];

    situacao: SelectItem[];

    caracteristicas: SelectItem[] = [];

    finalidades;

    value = false;

    bairros;

    cidades;

    estados;

    telefonesForm: FormGroup;

    localizacao = {
        cidade: null,
        estado: null
    };

    numberMask;

    constructor(private formBuilder: FormBuilder,
                private ref: ChangeDetectorRef,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                private estadosService: EstadosService,
                private cidadesService: CidadesService,
                private bairroService: BairroService,
                private router: Router,
                private usuarioService: UsuariosService,
                private finalidadeService: FinalidadeService,
                private caracteristicasService: CaracteristicasService,
                private alertService: AlertService) {
        this.imovelForm = this.formBuilder.group({
            'titulo': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
            'titulo_reduzido': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(255)])],
            'subtitulo': [null, Validators.compose([Validators.required])],
            'descricao_curta': [null, Validators.compose([Validators.required])],
            'pretensao': [null, Validators.compose([Validators.required])],
            'user_id': [null, Validators.compose([Validators.required])],
            'finalidade_id': [null, Validators.compose([Validators.required])],
            'caracteristicas': [null],
            'tipo': [null, Validators.compose([Validators.required])],
            'codigo': [null],
            'valor': [null, Validators.compose([Validators.required])],
            'valor_condominio': [null],
            'valor_condominio_validation': [false],
            'descricao': [null, Validators.compose([Validators.required, Validators.maxLength(1000)])],

            'longitude': [null, Validators.compose([Validators.required])],
            'latitude': [null, Validators.compose([Validators.required])],

            'area_util': [null, Validators.compose([Validators.required, ExtraValidators.conditional(
                group => group.controls.area_util.value > 15,
                Validators.required
            )])],
            'qtde_area_minimo': [0],
            'qtde_area_maximo': [0],
            'qtde_dormitoario_minimo': [0],
            'qtde_dormitoario_maximo': [0],
            'qtde_suite_minimo': [0],
            'qtde_suite_maximo': [0],
            'qtde_andar': [0],
            'qtde_elevador': [0],
            'qtde_unidade_andar': [0],
            'tour_virtual': [null],
            'video': [null],
            'informacao_complementar': [null],
            'descricao_localizacao': [null],
            'situacao': [null],

            'possui_divida': [false],
            'saldo_divida': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.possui_divida.value,
                Validators.required
            )])],
            'valor_mensalidade_divida': [null, Validators.compose([
                ExtraValidators.conditional(
                    group => group.controls.possui_divida.value,
                    Validators.required
                )])],
            'data_vencimento_divida': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.possui_divida.value,
                Validators.required
            )])],
            'data_ultima_parcela_divida': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.possui_divida.value,
                Validators.required
            )])],
            'qtde_parcela_restante_divida': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.possui_divida.value,
                Validators.required
            )])],
        });

        this.enderecoForm = this.formBuilder.group({
            'estado_id': [null, Validators.compose([Validators.required])],
            'cidade_id': [null, Validators.compose([Validators.required])],
            'bairro_id': [null, Validators.compose([Validators.required])],
            'endereco': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(255)])],
            'cep': [null, Validators.compose([Validators.required])],
            'numero': [null, Validators.compose([Validators.required])],
            'complemento': [null],
        });

        this.condicaoComercialForm = this.formBuilder.group({
            'anuncio_condicao_confirm': [false],
            'aceita_permuta': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'aceita_permuta_carro': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'aceita_permuta_imovel': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'aceita_permuta_outro': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'valor_permuta_carro': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'valor_permuta_imovel': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'valor_permuta_outro': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'descricao_permuta': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'valor_permuta_outro_descricao': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'valor_mensal': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
            'valor_entrada': [null, Validators.compose([ExtraValidators.conditional(
                group => group.controls.anuncio_condicao_confirm.value,
                Validators.required
            )])],
        });

        this.telefonesForm = this.formBuilder.group({
            'id': this.formBuilder.array([
                [null],
                [null],
            ]),
            'ddd': this.formBuilder.array([
                [null, Validators.compose([Validators.required])],
                [null, Validators.compose([Validators.required])],
            ]),
            'numero': this.formBuilder.array([
                [null, Validators.compose([Validators.required])],
                [null, Validators.compose([Validators.required])],
            ]),
            'principal': this.formBuilder.array([
                true,
                false,
            ]),
            'tipo': this.formBuilder.array([
                'celular',
                'fixo',
            ]),

        });


        this.finalidadeService.selectlist().subscribe(res => {
            this.finalidades = res;
            this.caracteristicasService.selectlist().subscribe(res => {
                this.caracteristicas = res;
                this.loadAnuncios();
            });
        });

        this.pretensao = [];
        // this.pretensao.push({label: 'Alugar', value: 'Alugar'});
        this.pretensao.push({label: 'Lancamento', value: 'Lancamento'});
        // this.pretensao.push({label: 'Revender', value: 'Revender'});
        this.pretensao.push({label: 'Vender', value: 'Vender'});

        this.situacao = [];
        this.situacao.push({label: 'Na Planta', value: 'na-planta'});
        this.situacao.push({label: 'Em Obra', value: 'em-obras'});
        this.situacao.push({label: 'Pronto para morar', value: 'pronto'});

        this.loadEstados();

        this.numberMask = UtilService.numberMasc();
    }


    ngOnInit() {

    }

    loadAnuncios() {
        if (this.anuncio) {
            const anuncio: any = Object.assign({}, this.anuncio);

            this.chageEstado(this.anuncio.endereco.data.estado_id);
            this.bairroService.selectBairros(anuncio.endereco.data.cidade_id).subscribe(bairros => {
                this.bairros = bairros;
            });
            anuncio.caracteristicas = Object.keys(anuncio.caracteristicas.data)
                .map(key => anuncio.caracteristicas.data[key]['id'])
                .map(x => x);
            this.imovelForm.patchValue(anuncio);
            this.imovelForm.controls['valor_condominio_validation']
                .setValue((this.imovelForm.controls['valor_condominio'].value > 0));
            if (this.imovelForm.controls['possui_divida'].value) {
                this.imovelForm.controls['data_vencimento_divida'].setValue(new Date(this.anuncio.data_vencimento_divida));
                this.imovelForm.controls['data_ultima_parcela_divida'].setValue(new Date(this.anuncio.data_ultima_parcela_divida));
            }

            this.enderecoForm.patchValue(this.anuncio.endereco.data);
            this.anuncio.telefones.data.forEach((x, index) => {
                this.telefonesForm.controls['id']['controls'][index].setValue(x.id);
                this.telefonesForm.controls['ddd']['controls'][index].setValue(x.ddd);
                this.telefonesForm.controls['numero']['controls'][index].setValue(x.numero);
                this.telefonesForm.controls['principal']['controls'][index].setValue(x.principal);
                this.telefonesForm.controls['tipo']['controls'][index].setValue(x.tipo);
            });
            if (this.anuncio.condicao_comercial) {
                this.condicaoComercialForm.patchValue(this.anuncio.condicao_comercial.data);
            }
        }
    }

    initTelefone(): FormGroup {
        return this.formBuilder.group({
            'ddd': [null, Validators.compose([Validators.required])],
            'numero': [null, Validators.compose([Validators.required])],
            'principal': [null, Validators.compose([Validators.required])],
            'tipo': [null, Validators.compose([Validators.required])],
        });
    }

    addTelefone() {
        const control = < FormArray > this.telefonesForm.controls['telefones'];
        control.push(this.initTelefone());
    }

    removeTelefone(i: number) {
        const control = < FormArray > this.telefonesForm.controls['telefones'];
        control.removeAt(i);
    }

    loadEstados() {
        this.estadosService.selectEstados().subscribe(estados => {
            this.estados = estados;
        });
    }

    saveImovel() {
        if (!this.validateForm()) {
            this.imovelForm.controls['tipo'].setValue('empreendimento');
            let form: any = this.imovelForm.value;
            form.endereco = this.enderecoForm.value;
            form.telefones = this.telefonesForm.value;
            form.condicao_comercial = this.condicaoComercialForm.value;

            form.valor = form.valor.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
            if (form.valor_condominio_validation) {
                form.valor_condominio = form.valor_condominio.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
            }

            if (form.possui_divida) {
                form.saldo_divida = form.saldo_divida.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
                form.valor_mensalidade_divida = form.valor_mensalidade_divida.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
            }

            if (form.anuncio_condicao_confirm) {
                form.condicao_comercial.valor_entrada = form.condicao_comercial.valor_entrada.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
                form.condicao_comercial.valor_mensal = form.condicao_comercial.valor_mensal.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
                form.condicao_comercial.valor_permuta_carro = form.condicao_comercial.valor_permuta_carro.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
                form.condicao_comercial.valor_permuta_imovel = form.condicao_comercial.valor_permuta_imovel.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
                form.condicao_comercial.valor_permuta_outro = form.condicao_comercial.valor_permuta_outro.toString().replace(/(R\$\s)(\d+)(,)*/i, '$2');
            }

            this.proximo.emit(form);
            this.localtion.emit(this.localizacao);
        }
    }

    actionVoltar() {
        this.voltar.emit(true);
    }

    chageEstado(estadoId: number) {
        this.localizacao.estado = this.estados.filter(x => x.value == estadoId)[0];
        this.cidadesService
            .selectCidades(estadoId)
            .subscribe(cidades => {
                this.cidades = cidades;
            });
    }

    chageCidade(cidadeId: number) {
        this.localizacao.cidade = this.cidades.filter(x => x.value == cidadeId)[0];

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

    selectdItem(selectedItem) {
        this.imovelForm.controls['user_id'].setValue(selectedItem.id);
    }

    validateForm(): boolean {
        return this.imovelForm.invalid || this.enderecoForm.invalid || this.condicaoComercialForm.invalid || this.telefonesForm.invalid;
    }

}
