import {Inject} from "@angular/core";
import {UsuariosService} from "../../app/usuarios/usuarios.service";
import {StorageService} from "../services/storage.service";
import {ActivatedRouteSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {TimeHelper} from "../helpers/time.helper";

export class Permissions {
    _storageService: StorageService;
    _usuarioService: UsuariosService;
    _timeHelper: TimeHelper;
    _childRoute: ActivatedRouteSnapshot;

    constructor(@Inject(UsuariosService) usuarioService,
                @Inject(TimeHelper) timeHelper,
                @Inject(StorageService) storageService) {
        this._usuarioService = usuarioService;
        this._storageService = storageService;
        this._timeHelper = timeHelper;
    }

    canActivate(rotaAcesso: string, params = null): Observable<boolean> | Promise<boolean> | boolean {
        /*/(\/:(id|teste2)\/?)/g*/
        return true;
        /*if (params) {
            for (let key in params) {
                rotaAcesso = rotaAcesso.replace(params[key], ':' + key);
            }
        }
        if (!this.storage().has('check_routes')) {
            return this._usuarioService.getCheckRota().map((rotas) => {
                this.storage().set('check_routes', rotas, this._timeHelper.addSeconds(180));
                return this.check(rotas, rotaAcesso);
            }).first();
        }
        const rotas = this.storage().get('check_routes');
        return this.check(rotas, rotaAcesso);*/
    }

    private check(rotas, rotaAcesso): boolean {
        return rotas.some(_ => _.rota == rotaAcesso);
    }

    /*private checkExpire() {
     const expiry = new Date();
     if (this.storage().has('check_routes')) {
     if (expiry < (new Date())) {
     return false;
     }
     }
     this.storage().remove('expire_route');
     expiry.setSeconds(expiry.getSeconds() + 180);
     this.storage().set('expire_route', expiry);
     return true;
     }*/

    private storage() {
        return this._storageService;
    }
}
