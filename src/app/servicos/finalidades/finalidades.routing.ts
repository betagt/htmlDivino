import {TemplateComponent} from "../../shared/template/template.component";
import {RouterModule, Routes} from "@angular/router";
import {FinalidadeListComponent} from "./finalidade-list/finalidade-list.component";
import {FinalidadeFormComponent} from "./finalidade-form/finalidade-form.component";


const FINALIDADES_ROUTES: Routes = [

    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: FinalidadeListComponent},
            {path: 'new', component: FinalidadeFormComponent},
            {path: ':id/edit', component: FinalidadeFormComponent},
            /*{path: ':id', component: CaracteristicaDetailComponent},*/
        ]
    },

];

export const FinalidadesRouting = RouterModule.forChild(FINALIDADES_ROUTES);