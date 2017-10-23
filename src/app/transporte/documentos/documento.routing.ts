import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from '../../shared/template/template.component';
import {DocumentoListComponent} from './documento-list/documento-list.component';
import {DocumentoFormComponent} from "./documento-form/documento-form.component";
import {DocumentoDetailComponent} from "./documento-detail/documento-detail.component";

const DOCUMENTO_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: DocumentoListComponent},
            {path: 'new', component: DocumentoFormComponent},
            {path: ':id/edit', component: DocumentoFormComponent},
            {path: ':id', component: DocumentoDetailComponent},
        ]
    },
];

export const DocumentoRouting = RouterModule.forChild(DOCUMENTO_ROUTES);
