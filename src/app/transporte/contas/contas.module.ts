import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContaListComponent} from './conta-list/conta-list.component';
import {ContaService} from "./service/conta.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {DropdownModule, TooltipModule} from "primeng/primeng";
import {ContasRouting} from "./contas.routing";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        ContasRouting
    ],
    declarations: [ContaListComponent],
    providers: [
        ContaService
    ]
})
export class ContasModule {
}
