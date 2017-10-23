import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {Ng2PaginationModule} from 'ng2-pagination';
import {RotaAcessoRouting} from './rota-acesso.routing';
import {RotaAcessoListComponent} from './rota-acesso-list/rota-acesso-list.component';
import {RotaAcessoService} from './rota-acesso.service';
import {RotaAcessoFormComponent} from './rota-acesso-form/rota-acesso-form.component';
import {RolesService} from '../roles/services/roles.service';
import { RotaAcessoDetailComponent } from './rota-acesso-detail/rota-acesso-detail.component';
import {DropdownModule} from "primeng/primeng";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        RotaAcessoRouting,
        DropdownModule
    ],
    declarations: [
        RotaAcessoListComponent,
        RotaAcessoFormComponent,
        RotaAcessoDetailComponent
    ],
    providers: [
        RotaAcessoService,
        RolesService
    ]
})
export class RotaAcessoModule {
}
