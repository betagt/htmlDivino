import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalFormComponent} from './modal-form/modal-form.component';
import {PermissionListComponent} from './permission-list/permission-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {PermissionsRouting} from "./permissions.routing";
import {PermissionService} from "./service/permission.service";
import { PermissionFormComponent } from './permission-form/permission-form.component';
import { PermissionDetailComponent } from './permission-detail/permission-detail.component';
import {KeysPipe} from "../../core/pipes/keys.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        PermissionsRouting
    ],
    declarations: [
        PermissionListComponent,
        PermissionFormComponent,
        PermissionDetailComponent,
        KeysPipe
    ],
    providers: [
        PermissionService,
    ]
})
export class PermissionsModule {
}
