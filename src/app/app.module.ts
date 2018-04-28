import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import {CanActivateViaOAuthGuard} from '../core/guard/oAuth.guard';
import {AppComponent} from './app.component';
import {AppRouting} from './app.routing';
import {NotFoundComponent} from './not-found/not-found.component';
import {AuthenticationModule} from './auth/authentication.module';
import {AuthService} from '../core/services/auth.service';
import {HttpClientService} from '../core/http-client.service';
import {StaticModule} from './static/static.module';
import {PreloaderService} from '../core/services/preloader.service';
import {PreloaderFullComponent} from '../core/preloader-full/preloader-full.component';
import {UsuariosService} from './usuarios/usuarios.service';
import {Permissions} from '../core/guard/permissions';

import {UsuarioGuard} from './usuarios/guard/usuario.guard';
import {Usuario} from './usuarios/usuario';
import {ChecarRotaGuard} from '../core/guard/checar-rota.guard';
import {StorageService} from '../core/services/storage.service';

import {TesteComponent} from './teste/teste.component';
import {Router} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FinaceiroModule} from "./financeiro/financeiro.module";
import {ServicosModule} from "./servicos/servicos.module";
import {DiMaskDirective} from "../core/directives/di-mask.directive";
import {CoolStorageModule} from "angular2-cool-storage";
import {TimeHelper} from "../core/helpers/time.helper";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FinaceiroModule,
        ServicosModule,
        StaticModule,
        AuthenticationModule,
        AppRouting,
        CoolStorageModule
    ],
    declarations: [
        AppComponent,
        NotFoundComponent,
        PreloaderFullComponent,
        TesteComponent,
        DiMaskDirective
    ],
    exports: [],
    providers: [
        CanActivateViaOAuthGuard,
        UsuarioGuard,
        ChecarRotaGuard,
        Permissions,
        AuthService,
        TimeHelper,
        HttpClientService,
        PreloaderService,
        UsuariosService,
        Usuario,
        StorageService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
platformBrowserDynamic().bootstrapModule(AppModule);
