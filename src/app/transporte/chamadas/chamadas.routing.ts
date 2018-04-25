import {Routes, RouterModule} from '@angular/router';
import {MinhasChamadasComponent} from "./minhas-chamadas/minhas-chamadas.component";
import {TemplateComponent} from "../../shared/template/template.component";
import {GerenciarChamadasComponent} from "./gerenciar-chamadas/gerenciar-chamadas.component";

const CHAMADAS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: 'minhas-corridas', component: MinhasChamadasComponent},
            {path: 'gerenciar-corridas', component: GerenciarChamadasComponent},
            /*{path: 'new', component: DocumentoFormComponent},
            {path: ':id/edit', component: DocumentoFormComponent},
            {path: ':id', component: DocumentoDetailComponent},*/
        ]
    },
];

export const ChamadasRouting = RouterModule.forChild(CHAMADAS_ROUTES);
