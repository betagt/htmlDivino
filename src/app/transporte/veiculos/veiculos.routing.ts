import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../../shared/template/template.component";
import {VeiculosListComponent} from "./veiculos-list/veiculos-list.component";
import {VeiculosFormComponent} from "./veiculos-form/veiculos-form.component";


const VEICULOS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: VeiculosListComponent},
            {path: 'new', component: VeiculosFormComponent},
            {path: ':id/edit', component: VeiculosFormComponent},
            /* {path: ':id', component: TipoDocumentoDetailComponent},*/
        ]
    },
];

export const VeiculosRouting = RouterModule.forChild(VEICULOS_ROUTES);
