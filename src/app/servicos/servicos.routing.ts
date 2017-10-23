import {Routes, RouterModule} from '@angular/router';
import {CanActivateViaOAuthGuard} from '../../core/guard/oAuth.guard';
import {ChecarRotaGuard} from '../../core/guard/checar-rota.guard';

const ANUNCIOS_ROUTES: Routes = [
    {
        path: 'anuncios', loadChildren: 'app/servicos/anuncios/anuncios.module#AnunciosModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'caracteristicas', loadChildren: 'app/servicos/caracteristicas/caracteristicas.module#CaracteristicasModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'finalidades', loadChildren: 'app/servicos/finalidades/finalidades.module#FinalidadesModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
];
export const ServicosRouting = RouterModule.forChild(ANUNCIOS_ROUTES);
