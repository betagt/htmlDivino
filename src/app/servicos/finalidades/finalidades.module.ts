import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FinalidadeListComponent} from './finalidade-list/finalidade-list.component';
import {FinalidadesRouting} from "./finalidades.routing";
import {Ng2PaginationModule} from "ng2-pagination";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FinalidadeService} from "../service/finalidade.service";
import { FinalidadeFormComponent } from './finalidade-form/finalidade-form.component';
import {DropdownModule, MultiSelectModule} from "primeng/primeng";
import {CaracteristicasService} from "../service/caracteristicas.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        FinalidadesRouting,
        DropdownModule,
        MultiSelectModule
    ],
    declarations: [FinalidadeListComponent, FinalidadeFormComponent],
    providers: [
        FinalidadeService,
        CaracteristicasService
    ]
})
export class FinalidadesModule {
}
