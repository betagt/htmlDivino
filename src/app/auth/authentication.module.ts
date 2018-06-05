import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from "./login/login.component";
import {UtilService} from "../../core/services/util.service";
import {OAuthService} from "angular2-oauth2/oauth-service";
import {HttpClientService} from "../../core/http-client.service";
import {AlterarSenhaComponent} from "./alterar-senha/alterar-senha.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        AlterarSenhaComponent
    ],
    exports: [
        LoginComponent,
        AlterarSenhaComponent
    ],
    providers: [
        UtilService,
        OAuthService,
        HttpClientService
    ]
})
export class AuthenticationModule {}
