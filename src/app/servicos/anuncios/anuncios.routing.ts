import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../../shared/template/template.component";
import {AnuncioListComponent} from "./anuncio-list/anuncio-list.component";
import {AnuncioFormComponent} from "./anuncio-form/anuncio-form.component";


const ANUNCIOS_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: AnuncioListComponent},
            {path: 'new', component: AnuncioFormComponent},
            {path: ':id/edit', component: AnuncioFormComponent},
            /*{path: ':id', component: PlanoDetailComponent},*/
        ]
    },

];

export const AnunciosRouting = RouterModule.forChild(ANUNCIOS_ROUTES);