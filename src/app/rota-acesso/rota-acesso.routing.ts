import {Routes, RouterModule} from '@angular/router';

import {RotaAcessoListComponent} from './rota-acesso-list/rota-acesso-list.component';
import {TemplateComponent} from '../shared/template/template.component';
import {RotaAcessoFormComponent} from './rota-acesso-form/rota-acesso-form.component';
import {RotaAcessoDetailComponent} from './rota-acesso-detail/rota-acesso-detail.component';

const ROTA_ACESSO_ROUTES: Routes = [ 
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: RotaAcessoListComponent},
            {path: 'new', component: RotaAcessoFormComponent},
            {path: ':id/edit', component: RotaAcessoFormComponent},
            {path: ':id', component: RotaAcessoDetailComponent},
        ]
    },

];

export const RotaAcessoRouting = RouterModule.forChild(ROTA_ACESSO_ROUTES);
