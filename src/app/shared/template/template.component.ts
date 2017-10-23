import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {ContextMenuOption} from '../../../core/menu/context-menu.component';
import {HttpClientService} from "../../../core/http-client.service";



@Component({
    selector: 'app-usuarios',
    templateUrl: './template.component.html',
    styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {

    options= [
        {
            text: 'Inicio',
            rota: '/home',
            icon: 'zmdi zmdi-home',
            disabled: false
        },
        {
            text: 'Usuarios',
            icon: 'zmdi zmdi-accounts',
            disabled: false,
            child: [{
                text: 'Listar',
                rota: '/usuarios',
                disabled: false,
            }]
        },
        {
            text: 'Acessos',
            icon: 'zmdi zmdi-lock',
            disabled: false,
            child: [{
                text: 'Listar',
                rota: '/rota_acesso',
                disabled: false,
            }]
        }];

    usuario;

    constructor(public router: Router,
                private authService: AuthService,
                private httpClientService: HttpClientService) {
        this.usuario = this.authService.getUser();
        this.options = this.authService.getRotas();
    }

    ngOnInit() {}

    logout() {
        this.httpClientService.get('/api/v1/admin/user/logout').subscribe(res=>{
            this.authService.logout();
            this.router.navigate(['/login']);
        },error=>{});
    }
}
