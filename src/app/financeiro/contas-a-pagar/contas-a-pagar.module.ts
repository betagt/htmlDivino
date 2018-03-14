import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContasAPagarListComponent} from './contas-a-pagar-list/contas-a-pagar-list.component';
import {ContasAPagarRouting} from './contas-a-pagar.routing';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {DropdownModule, TooltipModule} from "primeng/primeng";
import {ContasAPagarService} from "./service/contas-a-pagar.service";
import { ContasAPagarFormComponent } from './contas-a-pagar-form/contas-a-pagar-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        ContasAPagarRouting
    ],
    declarations: [ContasAPagarListComponent, ContasAPagarFormComponent],
    providers: [
        ContasAPagarService
    ]
})
export class ContasAPagarModule {
}
