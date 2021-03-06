import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {DropdownModule, TooltipModule} from "primeng/primeng";
import {TipoDocumentoListComponent} from "./tipo-documento-list/tipo-documento-list.component";
import {TipoDocumentoService} from "./service/tipo-documento.service";
import {TipoDocumentoRouting} from "./tipo-documento.routing";
import {TipoDocumentoFormComponent} from "./tipo-documento-form/tipo-documento-form.component";
import {TipoDocumentoDetailComponent} from "./tipo-documento-detail/tipo-documento-detail.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        TipoDocumentoRouting
    ],
    declarations: [TipoDocumentoListComponent, TipoDocumentoFormComponent, TipoDocumentoDetailComponent],
    providers: [
        TipoDocumentoService
    ]
})
export class TipoDocumentoModule {}
