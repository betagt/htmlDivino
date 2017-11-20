import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContaListComponent} from './conta-list/conta-list.component';
import {ContaService} from "./service/conta.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {AutoCompleteModule, CheckboxModule, DropdownModule, TooltipModule} from "primeng/primeng";
import {ContasRouting} from "./contas.routing";
import { ContaFormComponent } from './conta-form/conta-form.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        CheckboxModule,
        AutoCompleteModule,
        ContasRouting
    ],
    declarations: [ContaListComponent, ContaFormComponent],
    providers: [
        ContaService
    ]
})
export class ContasModule {
}
