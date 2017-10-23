import {Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {RotaAcessoService} from '../rota-acesso.service';
import {ListAbstract} from '../../../core/abstract/list.abstract';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-rota-acesso-list',
    templateUrl: './rota-acesso-list.component.html',
    styleUrls: ['./rota-acesso-list.component.css']
})
export class RotaAcessoListComponent extends ListAbstract implements OnInit{

    icon = 'zmdi zmdi-account';

    constructor(private rotaAcessoService: RotaAcessoService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, rotaAcessoService);
        this.includes = ['roles'];
    }

    ngOnInit(): void {
        super.form({
            'rota_acessos.text': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'rota_acessos.rota': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['desc']
        });
        this.list();
    }

}
