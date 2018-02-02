import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
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
    styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent extends ListAbstract implements OnInit {

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
        super.form({
            'users.name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'pessoas.cpf_cnpj': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'users.email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['desc']
        });
        this.list();
    }


}
