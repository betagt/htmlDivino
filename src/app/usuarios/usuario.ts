import {AuthService} from "../../core/services/auth.service";
import {Inject, Injectable} from "@angular/core";

@Injectable()
export class Usuario {
    id?: number;
    name: string;
    email: string;
    email_alternativo: string;
    sexo: string;
    imagem: string;
    status: string;
    chk_newsletter: boolean;
    roles?: any;
    permissions?: any;

    constructor(@Inject(AuthService) authService: AuthService) {
        if (authService.getUser())
            this.load(authService.getUser());
    }

    private load(usuario) {
        this.id = usuario.id;
        this.name = usuario.name;
        this.email = usuario.email;
        this.email_alternativo = usuario.email_alternativo;
        this.sexo = usuario.sexo;
        this.imagem = usuario.imagem;
        this.status = usuario.status;
        this.chk_newsletter = usuario.chk_newsletter;
        this.roles = usuario.roles;
        this.permissions = usuario.permissions;
    }

}
