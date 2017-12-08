import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {isNullOrUndefined} from "util";

@Injectable()
export class CanActivateViaOAuthGuard implements CanActivate {

    constructor(
        public router: Router,
        private authService: AuthService
    ) {}

    canActivate() {
        if (this.authService.isAuthenticated()) {
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
