import {Routes, RouterModule} from '@angular/router';
import {ContasAPagarListComponent} from "./contas-a-pagar-list/contas-a-pagar-list.component";
import {TemplateComponent} from "../../shared/template/template.component";
import {ContasAPagarFormComponent} from "./contas-a-pagar-form/contas-a-pagar-form.component";


const CONTAS_A_PAGAR: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: ContasAPagarListComponent},
            {path: 'new', component: ContasAPagarFormComponent},
            {path: ':id/edit', component: ContasAPagarFormComponent},
            /*{path: ':id', component: FormasPagamentoDetailComponent},*/
        ]
    },
];

export const ContasAPagarRouting = RouterModule.forChild(CONTAS_A_PAGAR);
