import {Component, OnInit, ChangeDetectorRef, NgZone} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {UsuariosService} from '../usuarios.service';
import {Validators, FormBuilder} from '@angular/forms';
import {CreateUpdateAbstract} from '../../../core/abstract/create-update.abstract';
import {ExtraValidators} from "../../../core/services/ExtraValidators.service";

declare var $: any;

@Component({
    selector: 'app-usuario-form',
    templateUrl: './usuario-form.component.html',
    styleUrls: ['./usuario-form.component.scss']
})
export class UsuarioFormComponent extends CreateUpdateAbstract implements OnInit {

    private usuario;

    constructor(private usuarioService: UsuariosService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, usuarioService, ['/usuarios']);
    }

    ngOnInit() {
        super.form({
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'email_confirmation': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'email_alternativo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'password': [null, Validators.compose([
                Validators.minLength(8),
                Validators.maxLength(255),
                ExtraValidators.conditional(
                    group => isNaN(this.routeParams.id),
                    Validators.required
                ),
            ])],
            'password_confirmation': [null, Validators.compose([
                Validators.minLength(8),
                Validators.maxLength(255),
                ExtraValidators.conditional(
                    group => group.controls.password.value != null,
                    Validators.required
                ),
            ])],
            'sexo': [1, Validators.compose([Validators.required])],
            'chk_newsletter': [0]
        });
        if (this.routeParams.id) {
            this.usuarioService.show(this.routeParams.id).subscribe(usuario => {
                this.saveForm.patchValue(usuario);
                this.usuario = usuario;
                this.loadJquery();
            });
        }

        this.loadJquery();
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            $('.selectpickeAr').selectpicker({
                noneSelectedText: 'Selecione'
            });
        });
    }

    changeListener($event): void {
        this.sendFile($event.target);
    }

    sendFile(inputValue) {
        const id = this.routeParams.id;
        const formData = new FormData();
        const file: File = inputValue.files[0];
        formData.append('imagem', file, file.name);

        this.usuarioService.sendFile(id, formData).subscribe(res => {
            this.usuario.imagem = res.data.imagem;
        });
    }

}
