import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from '../../shared/template/template.component';
import {ContaListComponent} from './conta-list/conta-list.component';
const CONTAS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: ContaListComponent},
            /*{path: 'new', component: DocumentoFormComponent},
            {path: ':id/edit', component: DocumentoFormComponent},
            {path: ':id', component: DocumentoDetailComponent},*/
        ]
    },
];

export const ContasRouting = RouterModule.forChild(CONTAS_ROUTES);
