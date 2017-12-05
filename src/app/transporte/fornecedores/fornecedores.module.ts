import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControleFornecedoresComponent} from './controle-fornecedores/controle-fornecedores.component';
import {FornecedoresRouting} from "./fornecedores.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {AutoCompleteModule, CheckboxModule, DropdownModule, TooltipModule} from "primeng/primeng";
import { ControleFornecedoresDetailComponent } from './controle-fornecedores-detail/controle-fornecedores-detail.component';
import {RatingModule} from "ngx-rating";

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
        RatingModule,
        FornecedoresRouting
    ],
    declarations: [ControleFornecedoresComponent, ControleFornecedoresDetailComponent]
})
export class FornecedoresModule {
}
