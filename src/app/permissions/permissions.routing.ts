import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from "../shared/template/template.component";
import {PermissionListComponent} from "./permission-list/permission-list.component";
import {PermissionFormComponent} from "./permission-form/permission-form.component";
import {PermissionDetailComponent} from "./permission-detail/permission-detail.component";


const PERMISSIONS_ACESSO_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: PermissionListComponent},
            {path: 'new', component: PermissionFormComponent},
            {path: ':id/edit', component: PermissionFormComponent},
            {path: ':id', component: PermissionDetailComponent},
        ]
    },

];

export const PermissionsRouting = RouterModule.forChild(PERMISSIONS_ACESSO_ROUTES);