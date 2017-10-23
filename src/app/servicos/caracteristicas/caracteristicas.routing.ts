import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../../shared/template/template.component";
import {CaracteristicaListComponent} from "./caracteristica-list/caracteristica-list.component";
import {CaracteristicaDetailComponent} from "./caracteristica-detail/caracteristica-detail.component";
import {CaracteristicaFormComponent} from "./caracteristica-form/caracteristica-form.component";


const CARACTERISTICAS_ROUTES: Routes = [

    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: CaracteristicaListComponent},
            {path: 'new', component: CaracteristicaFormComponent},
            {path: ':id/edit', component: CaracteristicaFormComponent},
            {path: ':id', component: CaracteristicaDetailComponent},
        ]
    },

];

export const CaracteristicasRouting = RouterModule.forChild(CARACTERISTICAS_ROUTES);