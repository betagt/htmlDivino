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

@Component({
    selector: 'app-veiculos-form',
    templateUrl: './veiculos-form.component.html',
    styleUrls: ['./veiculos-form.component.css']
})
export class VeiculosFormComponent extends CreateUpdateAbstract implements OnInit {

    _fb: FormBuilder;

    tipoDocumentos;

    marcasCarro;

    cores;

    modelosCarro;

    usuarios;

    status;

    constructor(private veiculoService: VeiculoService,
                formBuilder: FormBuilder,
                private utilService: UtilService,
                private tipoDocumento: TipoDocumentoService,
                private usuarioService: UsuariosService,
                private marcaCarroService: MarcaCarroService,
                private modeloCarroService: ModeloCarroService,
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
            this.veiculoService.show(this.routeParams.id).subscribe(formaPagamento => {
                this.saveForm.patchValue(formaPagamento);
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
                label: 'Aceito',
                value: 'aceito'
            },
            {
                label: 'Inválido',
                value: 'invalido'
            },
        ];
        super.form({
            'transporte_marca_carro_id': [null, Validators.compose([Validators.required])],
            'transporte_modelo_carro_id': [null, Validators.compose([Validators.required])],
            'ano': [null, Validators.compose([Validators.required])],
            'placa': [null, Validators.compose([Validators.required])],
            'user_id': [null, Validators.compose([Validators.required])],
            'cor': [null, Validators.compose([Validators.required])],
            'status': ['pendente', Validators.compose([Validators.required])],
            'documentos': this._fb.array([])
        });
        this.addDocumento();
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
        this.modeloCarroService.todosByMarca($event.value, true).subscribe(marcas => {
            this.modelosCarro = marcas;
        });
    }

    initDocumento(): FormGroup {
        return this._fb.group({
            'transporte_tipo_documento_id': [null, Validators.compose([Validators.required])],
            'arquivos': [null, Validators.compose([Validators.required])],
        });
    }

    updateOrCreate(data) {
        console.log(data);
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

    addDocumento() {
        const control = < FormArray > this.saveForm.controls['documentos'];
        control.push(this.initDocumento());
        console.log(control.controls['0'].controls.arquivos);
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
}
