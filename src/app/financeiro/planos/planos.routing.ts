import {Routes, RouterModule} from '@angular/router';
import {PlanoListComponent} from "./plano-list/plano-list.component";
import {PlanoFormComponent} from "./plano-form/plano-form.component";
import {TemplateComponent} from "../../shared/template/template.component";
import {PlanoDetailComponent} from "./plano-detail/plano-detail.component";


const PLANOS_ACESSO_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: PlanoListComponent},
            {path: 'new', component: PlanoFormComponent},
            {path: ':id/edit', component: PlanoFormComponent},
            {path: ':id', component: PlanoDetailComponent},
        ]
    },

];

export const PlanosRouting = RouterModule.forChild(PLANOS_ACESSO_ROUTES);