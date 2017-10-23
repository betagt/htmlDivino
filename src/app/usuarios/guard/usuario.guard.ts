import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Permissions} from '../../../core/guard/permissions';
import {Usuario} from "../usuario";

@Injectable()
export class UsuarioGuard implements CanActivateChild {
    constructor(
        private permissions: Permissions,
        private currentUser: Usuario) {}
    canActivateChild(childRoute: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.permissions.canActivate(state.url);
    }
}
