import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormasPagamentoListComponent} from './formas-pagamento-list/formas-pagamento-list.component';
import {FormasPagamentoRouting} from "./formas-pagamento.routing";
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";
import {FormasPagamentoService} from "./service/formas-pagamento.service";
import { FormasPagamentoFormComponent } from './formas-pagamento-form/formas-pagamento-form.component';
import {DropdownModule, TooltipModule} from "primeng/primeng";
import { FormasPagamentoDetailComponent } from './formas-pagamento-detail/formas-pagamento-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        FormasPagamentoRouting
    ],
    declarations: [FormasPagamentoListComponent, FormasPagamentoFormComponent, FormasPagamentoDetailComponent],
    providers: [
        FormasPagamentoService
    ]
})
export class FormasPagamentoModule {
}
