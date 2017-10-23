import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleListComponent} from './role-list/role-list.component';
import {RolesRouting} from './roles.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {Ng2PaginationModule} from 'ng2-pagination';
import {RolesService} from './services/roles.service';
import { RoleFormComponent } from './role-form/role-form.component';
import {PermissionService} from '../permissions/service/permission.service';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import {AlertService} from '../../core/services/alert.service.com';
import {ModalFormComponent} from "../permissions/modal-form/modal-form.component";
import {DialogModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        RolesRouting,
        DialogModule,

    ],
    declarations: [
        RoleListComponent,
        RoleFormComponent,
        RoleDetailComponent,
        ModalFormComponent
    ],
    providers: [
        RolesService,
        PermissionService,
        AlertService
    ]
})
export class RolesModule {}
