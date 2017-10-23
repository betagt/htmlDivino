import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../../shared/template/template.component";
import {PlanoContratacaoListComponent} from "./plano-contratacao-list/plano-contratacao-list.component";
import {PlanoContratacaoFormComponent} from "./plano-contratacao-form/plano-contratacao-form.component";
import {PlanoContratacaoDetailComponent} from "./plano-contratacao-detail/plano-contratacao-detail.component";
 

const PLANO_CONTRATACOES_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: PlanoContratacaoListComponent},
            {path: ':anuncio/new', component: PlanoContratacaoFormComponent},
            {path: ':id/edit', component: PlanoContratacaoFormComponent},
            {path: ':anuncio/:id/edit', component: PlanoContratacaoFormComponent},
            {path: ':id', component: PlanoContratacaoDetailComponent},
        ]
    },
];

export const PlanoContratacoesRouting = RouterModule.forChild(PLANO_CONTRATACOES_ROUTES);