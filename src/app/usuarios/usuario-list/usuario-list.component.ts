import {Component, OnInit, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import {UsuariosService} from '../usuarios.service';
import {Observable} from 'rxjs';
import {URLSearchParams} from '@angular/http';
import {ListAbstract} from '../../../core/abstract/list.abstract';
import {ListInterface} from '../../../core/interfaces/list.interface';
import {FormBuilder, Validators} from '@angular/forms';


export interface Usuario {
    id?: number;
    data: any;
    meta: any;
}

@Component({
    selector: 'app-usuario-list',
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UsuarioListComponent extends ListAbstract implements OnInit {

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
        this.list();
    }


}
