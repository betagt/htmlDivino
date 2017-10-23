import {Component, OnInit, ChangeDetectorRef, NgZone, ElementRef, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Validators, FormBuilder} from '@angular/forms';

import {CreateUpdateAbstract} from '../../../core/abstract/create-update.abstract';
import {RotaAcessoService} from '../rota-acesso.service';
import {RolesService} from "../../roles/services/roles.service";
import {URLSearchParams} from "@angular/http";
import {StorageService} from "../../../core/services/storage.service";
import {UsuariosService} from "../../usuarios/usuarios.service";

declare var $: any;

@Component({
    selector: 'app-usuario-form',
    templateUrl: 'rota-acesso-form.component.html',
    styleUrls: ['rota-acesso-form.component.scss'],
})
export class RotaAcessoFormComponent extends CreateUpdateAbstract implements OnInit {

    private rotaAcesso;
    private rotasVinculo;
    private roleValues;
    private driver;
    private ambiente: any[];
    @ViewChild('selectpicker') selectRef: ElementRef;

    constructor(private rotaAcessoService: RotaAcessoService,
                private rolesService: RolesService,
                private ngZone: NgZone,
                private storageService: StorageService,
                private _usuarioService: UsuariosService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, rotaAcessoService);
        this.driver = this.storageService;
    }

    ngOnInit() {
        this.ambiente = [];
        this.ambiente.push({label: 'Admin Painel', value: 'admin'});
        this.ambiente.push({label: 'Admin Portal', value: 'adminsite'});
        super.form({
            'text': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'rota': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'icon': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'parent_id': [null],
            'roles': [null, Validators.compose([Validators.required])],
            'prioridade': [99, Validators.compose([Validators.required])],
            'ambiente': [99, Validators.compose([Validators.required])],
            'disabled': [true],
            'is_menu': [true],
        });
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            params.append('include', 'roles');
            this.rotaAcessoService.show(this.routeParams.id, params).subscribe(rotas => {
                this.saveForm.patchValue(rotas);
                this.rotaAcesso = rotas;
                this.loadSelectRotas();
            });
            return;
        }
        this.loadSelectRotas();
    }

    private loadSelectRotas() {
        this._usuarioService.getCheckRota().subscribe(response => {
            this.rotasVinculo = response;
            this.loadSelect();
        });
    }

    private loadSelect() {
        if (this.driver.has('selectList')) {
            this.roleValues = this.driver.get('selectList');
            this.loadJquery();
            return;
        }
        this.rolesService.listSelect().subscribe(res => {
            const expiry = new Date()
            expiry.setSeconds(expiry.getSeconds() + 60);
            this.driver.set('selectList', res, expiry);
            this.roleValues = res;
            this.loadJquery();
        });
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            if (this.rotaAcesso) {
                this.updateSelectList();
            }
            $('.selectpickeAr').selectpicker({
                noneSelectedText: 'Selecione'
            });
            $('.chosen-my').selectpicker({
                noneSelectedText: 'Selecione'
            });
        });
    }

    updateSelectList() {
        const options = this.selectRef.nativeElement.options;
        const rotas = this.rotaAcesso.roles.data;
        for (let i = 0; i < options.length; i++) {
            options[i].selected = rotas.some(variavel => variavel.id == Number(options[i].value.split(':')[1]));
        }
    }

    updateOrCreate(user) {
        if (!this.saveForm.invalid) {
            if (user.roles.data) {
                const data = user.roles.data;
                user.roles = [];
                for (let i = 0; i < data.length; i++) {
                    user.roles.push(data[i].id);
                }
            }
            this.rotaAcessoService.updateOrCreate(user, this.routeParams.id).subscribe(res => {
                this.router.navigate(['/rota_acesso']);
            }, erro => {
            });
        }
    }
}
