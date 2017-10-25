import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {VeiculoService} from "../service/veiculo.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {Location} from "@angular/common";
import {UtilService} from "../../../../core/services/util.service";
import {TipoDocumentoService} from "../../tipo-documento/service/tipo-documento.service";
import {MarcaCarroService} from "../../../usuarios/services/marca-carro.service";
import {ModeloCarroService} from "../../../usuarios/services/modelo-carro.service";

@Component({
    selector: 'app-veiculos-form',
    templateUrl: './veiculos-form.component.html',
    styleUrls: ['./veiculos-form.component.css']
})
export class VeiculosFormComponent extends CreateUpdateAbstract implements OnInit {

    _fbVeiculo: FormGroup;

    _fb: FormBuilder;

    tipoDocumentos;

    marcasCarro;

    cores;

    modelosCarro;

    constructor(private veiculoService: VeiculoService,
                formBuilder: FormBuilder,
                private utilService: UtilService,
                private tipoDocumento: TipoDocumentoService,
                private marcaCarroService: MarcaCarroService,
                private modeloCarroService: ModeloCarroService,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, veiculoService, ['/transporte/tipo-documento']);
        this._fb = formBuilder;
    }

    ngOnInit() {
        super.form({
            'nome': [null, Validators.compose([Validators.minLength(2), Validators.maxLength(255), Validators.required])],
            'descricao': [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
            'observacao': [null, Validators.compose([Validators.maxLength(255)])],
            'precisa_de_documento': [true]
        });
        if (this.routeParams.id) {
            this.veiculoService.show(this.routeParams.id).subscribe(formaPagamento => {
                this.saveForm.patchValue(formaPagamento);
            });
            return;
        }
        this.veiculoForm();
    }

    loadModelos($event) {
        this.modeloCarroService.todosByMarca($event.value, true).subscribe(marcas => {
            this.modelosCarro = marcas;
        });
    }

    veiculoForm() {
        this._fbVeiculo = this._fb.group({
            'transporte_marca_carro_id': [null, Validators.compose([])],
            'transporte_modelo_carro_id': [null, Validators.compose([])],
            'ano': [null, Validators.compose([])],
            'placa': [null, Validators.compose([])],
            'cor': [null, Validators.compose([])],
            'arquivo': [null, Validators.compose([])],
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
    }

    changeListenerVeiculo($event) {
        const file = this.utilService.readThis($event.target);
        file.onloadend = (e) => this._fbVeiculo.controls['arquivo'].setValue(file.result);
    }
}
