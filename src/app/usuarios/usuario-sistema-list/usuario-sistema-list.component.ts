import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {UsuariosService} from '../usuarios.service';
import {URLSearchParams} from '@angular/http';
import {ListAbstract} from '../../../core/abstract/list.abstract';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-usuario-sistema-list',
    templateUrl: './usuario-sistema-list.component.html',
    styleUrls: ['./usuario-sistema-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioSistemaListComponent extends ListAbstract implements OnInit {

    perfil: any;

    constructor(private usuariosService: UsuariosService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, usuariosService);
        this._params = new URLSearchParams();
        this.includes = ['roles'];
        this.buttons.remove = true;
        this.hasExclude = false;
    }

    ngOnInit(): void {
        this.perfil = [
            {
                label: 'Selecione',
                value: null
            },
            {
                label: 'Passageiro',
                value: 'cliente'
            },
            {
                label: 'Motorista',
                value: 'fornecedor'
            }
        ];
        super.form({
            'users.name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'pessoas.cpf_cnpj': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'roles.slug': [null],
            'users.email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['desc']
        });
        this.pesquisar(this.pesquisaForm.value);
    }


}
