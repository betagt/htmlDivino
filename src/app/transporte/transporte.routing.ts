import {Routes, RouterModule} from '@angular/router';
import {CanActivateViaOAuthGuard} from '../../core/guard/oAuth.guard';
import {ChecarRotaGuard} from '../../core/guard/checar-rota.guard';

const TRANSPORTE_ROUTES: Routes = [
    {
        path: 'tipo-documento', loadChildren: 'app/transporte/tipo-documento/tipo-documento.module#TipoDocumentoModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'documento', loadChildren: 'app/transporte/documentos/documentos.module#DocumentosModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'servico', loadChildren: 'app/transporte/servicos/servicos.module#ServicosModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'chamadas', loadChildren: 'app/transporte/chamadas/chamadas.module#ChamadasModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'veiculos', loadChildren: 'app/transporte/veiculos/veiculos.module#VeiculosModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
];
export const TransporteRouting = RouterModule.forChild(TRANSPORTE_ROUTES);
