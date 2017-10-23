import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";

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

        if (this.authService.getUser().roles.data.some(x => x.slug == 'fornecedor')) {
            this.router.navigate(['/transporte/chamadas/minhas-corridas']);
            return;
        } else {
            this.router.navigate(['/home']);
        }
        return false;
    }
}
