import {Injectable} from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Permissions} from './permissions';
import {AuthService} from "../services/auth.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class ChecarRotaGuard implements CanActivateChild {
    constructor(private permissions: Permissions,
                private authService: AuthService,
                private router: Router) {
    }

    canActivateChild(childRoute: ActivatedRouteSnapshot,
                     state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const response = this.permissions.canActivate(state.url, childRoute.params);
        if (response instanceof Observable) {
            return response.map((auth) => {
                return this.checkresponse(auth);
            }).first();
        }
        return this.checkresponse(response);
    }

    private checkresponse(auth) {
        if (auth) {
            return true;
        }
        const user: any = this.authService.getUser();

        if (isNullOrUndefined(user)) {
            this.router.navigate(['/login']);
            return false;
        }

        if (user.roles.data.some(x => x.slug == 'fornecedor')) {
            this.router.navigate(['/transporte/chamadas/minhas-corridas']);
            return;
        } else {
            this.router.navigate(['/home']);
        }
        return false;
    }
}
