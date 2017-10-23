import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../../shared/template/template.component";
import {FormasPagamentoListComponent} from "./formas-pagamento-list/formas-pagamento-list.component";
import {FormasPagamentoFormComponent} from "./formas-pagamento-form/formas-pagamento-form.component";
import {FormasPagamentoDetailComponent} from "./formas-pagamento-detail/formas-pagamento-detail.component";


const FORMAS_PAGAMENTO_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: FormasPagamentoListComponent},
            {path: 'new', component: FormasPagamentoFormComponent},
            {path: ':id/edit', component: FormasPagamentoFormComponent},
            {path: ':id', component: FormasPagamentoDetailComponent},
        ]
    },
];

export const FormasPagamentoRouting = RouterModule.forChild(FORMAS_PAGAMENTO_ROUTES);