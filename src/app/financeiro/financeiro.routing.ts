import {Routes, RouterModule} from '@angular/router';
import {CanActivateViaOAuthGuard} from "../../core/guard/oAuth.guard";
import {ChecarRotaGuard} from "../../core/guard/checar-rota.guard";

const FINANCEIRO_ROUTES: Routes = [
    {
        path: 'planos', loadChildren: 'app/financeiro/planos/planos.module#PlanosModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'plano-contratacoes', loadChildren: 'app/financeiro/plano-contratacoes/plano-contratacoes.module#PlanoContratacoesModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
    {
        path: 'formas-de-pagamento', loadChildren: 'app/financeiro/formas-pagamento/formas-pagamento.module#FormasPagamentoModule',
        canActivate: [CanActivateViaOAuthGuard],
        canActivateChild: [ChecarRotaGuard],
    },
];
export const FinanceiroRouting = RouterModule.forChild(FINANCEIRO_ROUTES);
