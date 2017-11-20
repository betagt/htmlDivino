import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ContaService} from "../service/conta.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {UsuariosService} from "../../../usuarios/usuarios.service";
import {BancoService} from "../../bancos/service/banco.service";

@Component({
    selector: 'app-conta-form',
    templateUrl: './conta-form.component.html',
    styleUrls: ['./conta-form.component.css'],
    providers: [UsuariosService, BancoService]
})
export class ContaFormComponent extends CreateUpdateAbstract implements OnInit {
    status;
    tipo;
    usuarios;
    conta;
    bancos;

    constructor(private contaService: ContaService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                private usuarioService: UsuariosService,
                private bancoService: BancoService,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, contaService, ['/transporte/contas']);
        this.status = [
            {
                label: 'Sim',
                value: true
            },
            {
                label: 'Não',
                value: false
            },
        ];
        this.tipo = [
            {
                label: 'Corrente',
                value: 'cc'
            },
            {
                label: 'Poupança',
                value: 'cp'
            },
        ];
    }

    ngOnInit() {
        this.bancoService.todos().subscribe(bancos => {
            this.bancos = bancos;
        });
        super.form({
            'codigo': [1, Validators.compose([Validators.maxLength(255)])],
            'user_id': [null, Validators.compose([Validators.required])],
            'agencia': [null],
            'conta': [null],
            'principal': [false],
            'tipo': ['cc'],
            'beneficiario': [null],
            'cpf':  [null, Validators.compose([Validators.required])],
        });
        if (this.routeParams.id) {
            this.contaService.show(this.routeParams.id).subscribe(conta => {
                this.saveForm.patchValue(conta);
                this.conta = conta;
            });
            return;
        }
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
        this.saveForm.controls['beneficiario'].setValue(selectedItem.nome);
        this.saveForm.controls['user_id'].setValue(selectedItem.id);
    }
}
