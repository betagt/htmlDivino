import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {UsuariosService} from '../../usuarios/usuarios.service';
import {AlertService} from "../../../core/services/alert.service.com";
import {ExtraValidators} from "../../../core/services/ExtraValidators.service";


@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;

    fbReSenha;

    cadastroForm: FormGroup;

    constructor(public router: Router,
                private authService: AuthService,
                private formBuilder: FormBuilder,
                private usuariosService: UsuariosService) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            'username': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])]
        });
        this.fbReSenha = this.formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])]
        });
        this.cadastroForm = this.formBuilder.group({
            'email': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'ddd': [null, Validators.compose([Validators.required])],
            'numero': [null, Validators.compose([Validators.required])],
            'name': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(64)])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(32)])],
            'password_confirmation': [null, Validators.compose([
                Validators.minLength(8),
                Validators.maxLength(255),
                ExtraValidators.conditional(
                    group => group.controls.password.value != null,
                    Validators.required
                ),
            ])],
        });
    }

    login(formData) {
        if (!this.loginForm.invalid) {
            this.sendlogin(formData);
        }
    }

    private sendlogin(formData) {
        this.authService.getAccessToken(formData)
            .subscribe(
                response => {
                    return this.usuariosService.getUserPerfil().subscribe(userResponse => {
                        this.authService.setAuthenticated(userResponse);
                        this.usuariosService.getRotaAcessos().subscribe(rotas => {
                            this.authService.setRotas(rotas);
                            if (userResponse.roles.data.some(x => x.slug == 'fornecedor')) {
                                this.router.navigate(['/transporte/chamadas/minhas-corridas']);
                                return;
                            } else if (userResponse.roles.data.some(x => x.slug == 'cliente')) {
                                AlertService.flashMessage('você não tem permissão para acessar essa area!');
                                this.authService.logout();
                                return;
                            } else {
                                this.router.navigate(['/home']);
                            }
                        });
                    });
                },
                error => {
                    AlertService.flashMessage('Login ou Senha inválidos!');
                }
            );
    }

    cadastrar(data) {
        if (!this.cadastroForm.invalid) {
            this.usuariosService.registrar(data).subscribe(res => {
                AlertService.sucess('Sucesso!', 'Usuário cadastrado com sucesso');
                this.sendlogin({
                    username: data.email, password: data.password
                });
            }, error => {
                if (error.status != 422) {
                    AlertService.error('Error!', 'Opss, algo errado aconteceu!');
                }
            });
        }
    }

    recuperarSenha(formData) {
        this.usuariosService.recuperarSenha(formData).subscribe(res => {
            AlertService.flashMessage(res.success.description, 'bounceInUp');
        }, error => {
            let errors = JSON.parse(error._body);
            AlertService.flashMessage(errors.error.description);
        });
    }
}
