import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CaracteristicaListComponent} from './caracteristica-list/caracteristica-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {CaracteristicasService} from "../service/caracteristicas.service";
import {Ng2PaginationModule} from "ng2-pagination";
import {CaracteristicasRouting} from "./caracteristicas.routing";
import { CaracteristicaFormComponent } from './caracteristica-form/caracteristica-form.component';
import { CaracteristicaDetailComponent } from './caracteristica-detail/caracteristica-detail.component';
import {DropdownModule} from "primeng/primeng";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        CaracteristicasRouting,
        DropdownModule
    ],
    declarations: [CaracteristicaListComponent, CaracteristicaFormComponent, CaracteristicaDetailComponent],
    providers: [
        CaracteristicasService
    ]
})
export class CaracteristicasModule {
}
