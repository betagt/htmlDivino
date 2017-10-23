import {Routes, RouterModule} from '@angular/router';
import {TemplateComponent} from '../shared/template/template.component';
import {RoleListComponent} from './role-list/role-list.component';
import {RoleFormComponent} from "./role-form/role-form.component";
import {RoleDetailComponent} from "./role-detail/role-detail.component";

const ROLES_ROUTES: Routes = [
    {
        path: '',
        component: TemplateComponent,
        children: [
            {path: '', component: RoleListComponent},
            {path: 'new', component: RoleFormComponent},
            {path: ':id/edit', component: RoleFormComponent},
            {path: ':id', component: RoleDetailComponent},
        ]
    },
];
export const RolesRouting = RouterModule.forChild(ROLES_ROUTES);
