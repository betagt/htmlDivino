import {Routes, RouterModule} from '@angular/router';
import {MinhasChamadasComponent} from "./minhas-chamadas/minhas-chamadas.component";
import {TemplateComponent} from "../../shared/template/template.component";

const CHAMADAS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: 'minhas-corridas', component: MinhasChamadasComponent},
            /*{path: 'new', component: DocumentoFormComponent},
            {path: ':id/edit', component: DocumentoFormComponent},
            {path: ':id', component: DocumentoDetailComponent},*/
        ]
    },
];

export const ChamadasRouting = RouterModule.forChild(CHAMADAS_ROUTES);
