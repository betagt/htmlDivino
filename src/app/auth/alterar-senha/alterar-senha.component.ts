import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {Message} from 'primeng/primeng';
import {AuthService} from "../../../core/services/auth.service";
import {UsuariosService} from "../../usuarios/usuarios.service";

declare const $: any;

@Component({
    selector: 'app-alterar-senha',
    templateUrl: './alterar-senha.component.html',
    styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit, AfterViewInit {

    senhaForm: FormGroup;
    routeParams;
    success = false;

    constructor(public router: Router,
                private authService: AuthService,
                private activatedRoute: ActivatedRoute,
                private formBuilder: FormBuilder,
                private usuariosService: UsuariosService) {
        this.routeParams = this.activatedRoute.snapshot.params;
    }

    ngOnInit(): void {
        this.init();
    }

    ngAfterViewInit(): void {
    }

    init() {
        this.senhaForm = this.formBuilder.group({
            'token': [this.routeParams.hash],
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password_confirmation': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
        });
    }

    recuperarSenha(formRecuperarSenha) {
        if (!this.senhaForm.invalid) {
            this.usuariosService.resetarSenha(formRecuperarSenha).subscribe(res => {
                //AlertService.messagedefault('success', 'Sucesso!', 'Senha alterada com sucesso!', 'OK', '#82bf60');
                this.success = true;
            }, error => {
            });
        }
    }
}
