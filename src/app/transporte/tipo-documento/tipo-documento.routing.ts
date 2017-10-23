import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../../shared/template/template.component";
import {TipoDocumentoListComponent} from "./tipo-documento-list/tipo-documento-list.component";
import {TipoDocumentoFormComponent} from "./tipo-documento-form/tipo-documento-form.component";
import {TipoDocumentoDetailComponent} from "./tipo-documento-detail/tipo-documento-detail.component";


const TIPO_DOCUMENTO_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: TipoDocumentoListComponent},
            {path: 'new', component: TipoDocumentoFormComponent},
            {path: ':id/edit', component: TipoDocumentoFormComponent},
            {path: ':id', component: TipoDocumentoDetailComponent},
        ]
    },
];

export const TipoDocumentoRouting = RouterModule.forChild(TIPO_DOCUMENTO_ROUTES);
