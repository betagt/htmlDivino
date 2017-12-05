import {Routes, RouterModule} from '@angular/router';
import {ControleFornecedoresComponent} from "./controle-fornecedores/controle-fornecedores.component";
import {TemplateComponent} from "../../shared/template/template.component";
import {ControleFornecedoresDetailComponent} from "./controle-fornecedores-detail/controle-fornecedores-detail.component";

const FORNECEDORES_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: ControleFornecedoresComponent},
            {path: ':id', component: ControleFornecedoresDetailComponent},
        ]
    },
];

export const FornecedoresRouting = RouterModule.forChild(FORNECEDORES_ROUTES);
