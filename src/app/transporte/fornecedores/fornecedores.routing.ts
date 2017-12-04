import {Routes, RouterModule} from '@angular/router';
import {ControleFornecedoresComponent} from "./controle-fornecedores/controle-fornecedores.component";
import {TemplateComponent} from "../../shared/template/template.component";

const FORNECEDORES_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: ControleFornecedoresComponent},
        ]
    },
];

export const FornecedoresRouting = RouterModule.forChild(FORNECEDORES_ROUTES);
