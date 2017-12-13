import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {VeiculoService} from "../service/veiculo.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {Location} from "@angular/common";
import {UtilService} from "../../../../core/services/util.service";
import {TipoDocumentoService} from "../../tipo-documento/service/tipo-documento.service";
import {MarcaCarroService} from "../../../usuarios/services/marca-carro.service";
import {ModeloCarroService} from "../../../usuarios/services/modelo-carro.service";
import {UsuariosService} from "../../../usuarios/usuarios.service";
import {AlertService} from "../../../../core/services/alert.service.com";

import {URLSearchParams} from '@angular/http';
import {DocumentoService} from "../../documentos/service/documento.service";

@Component({
    selector: 'app-veiculos-form',
    templateUrl: './veiculos-form.component.html',
    styleUrls: ['./veiculos-form.component.css'],
    providers: [
        AlertService
    ]
})
export class VeiculosFormComponent extends CreateUpdateAbstract implements OnInit {

    _fb: FormBuilder;

    tipoDocumentos;

    marcasCarro;

    cores;

    modelosCarro;

    usuarios;

    status;

    veiculo;

    display;

    arquivos;

    constructor(private veiculoService: VeiculoService,
                formBuilder: FormBuilder,
                private alertService: AlertService,
                private utilService: UtilService,
                private tipoDocumento: TipoDocumentoService,
                private usuarioService: UsuariosService,
                private marcaCarroService: MarcaCarroService,
                private modeloCarroService: ModeloCarroService,
                private documentoService: DocumentoService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, veiculoService, ['/transporte/veiculos']);
        this._fb = formBuilder;
    }

    ngOnInit() {
        this.veiculoForm();
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            params.append('include', 'documentos,documentos.arquivos');
            this.veiculoService.show(this.routeParams.id, params).subscribe(veiculo => {
                this.veiculo = Object.assign({}, veiculo);
                this.listaModelo(veiculo.transporte_modelo_carro_id);
                delete veiculo.documentos;
                this.saveForm.patchValue(veiculo);
            });
            return;

        }
    }

    veiculoForm() {
        this.status = [
            {
                label: 'Pendente',
                value: 'pendente'
            },
            {
                label: 'Ativo',
                value: 'aceito'
            },
            {
                label: 'Inativo',
                value: 'invalido'
            },
        ];
        super.form({
            'transporte_marca_carro_id': [null, Validators.compose([Validators.required])],
            'transporte_modelo_carro_id': [null, Validators.compose([Validators.required])],
            'ano': [null, Validators.compose([Validators.required])],
            'ano_modelo_fab': [null, Validators.compose([Validators.required])],
            'placa': [null, Validators.compose([Validators.required])],
            'renavam': [null, Validators.compose([Validators.required])],
            'chassi': [null, Validators.compose([Validators.required])],
            'user_id': [null, Validators.compose([Validators.required])],
            'cor': [null, Validators.compose([Validators.required])],
            'status': ['pendente', Validators.compose([Validators.required])],
            'documentos': this._fb.array([])
        });

        this.marcaCarroService.todos(true).subscribe(marcas => {
            this.marcasCarro = marcas;
        });
        this.veiculoService.cores(true).subscribe(res => {
            this.cores = res;
        });
        this.tipoDocumento.todosVeiculo().subscribe(res => {
            this.tipoDocumentos = this.tipoDocumento.formatSelect(res, 'nome', 'id');
        });
    }

    loadModelos($event) {
        this.listaModelo($event.value);
    }

    listaModelo(id) {
        this.modeloCarroService.todosByMarca(id, true).subscribe(marcas => {
            this.modelosCarro = marcas;
        });
    }

    updateOrCreate(data) {
        if (!this.saveForm.invalid) {
            this.veiculoService.updateOrCreate(data, this.routeParams.id).subscribe(res => {
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
            'nit': [null],
            'cidade': [null],
            'seguradora': [null],
            'vistoriador': [null],
            'alienado': [null],
            'cobertura_de_vidas': ['sim'],
            'cobertura_de_terceiros': ['nao'],
        });
    }

    addDocumento() {
        const control = < FormArray > this.saveForm.controls['documentos'];
        control.push(this.initDocumento());
        console.log(control.controls['0'].controls.arquivos);
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
                this.veiculo.documentos.data.splice(i, 1);
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

    loadArquivos(arquivos) {
        this.display = true;
        this.arquivos = arquivos;
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


    aceitar(id, index) {
        this.alertService.confirm({
            title: 'Confirmação!',
            text: 'Deseja realmente recusar este documento?',
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
        }).then(sucess => {
            this.documentoService.aceitar(id).subscribe(res => {
                AlertService.sucess('sucesso!', 'documento aceito!');
                this.veiculo.documentos.data[index].status = 'aceito';
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
                this.veiculo.documentos.data[index].status = 'invalido';
            });
        }, error => {
        });
    }
}
