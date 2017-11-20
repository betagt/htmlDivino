import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from '../../shared/template/template.component';
import {ContaListComponent} from './conta-list/conta-list.component';
import {ContaFormComponent} from "./conta-form/conta-form.component";
const CONTAS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: ContaListComponent},
            {path: 'new', component: ContaFormComponent},
            {path: ':id/edit', component: ContaFormComponent},
            /*{path: ':id', component: DocumentoDetailComponent},*/
        ]
    },
];

export const ContasRouting = RouterModule.forChild(CONTAS_ROUTES);
