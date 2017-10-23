import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from '../../shared/template/template.component';
import {ServicoListComponent} from './servico-list/servico-list.component';
import {ServicoFormComponent} from './servico-form/servico-form.component';
import {ServicoDetailComponent} from "./servico-detail/servico-detail.component";


const SERVICO_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: ServicoListComponent},
            {path: 'new', component: ServicoFormComponent},
            {path: ':id/edit', component: ServicoFormComponent},
            {path: ':id', component: ServicoDetailComponent},
        ]
    },
];

export const ServicosRouting = RouterModule.forChild(SERVICO_ROUTES);
