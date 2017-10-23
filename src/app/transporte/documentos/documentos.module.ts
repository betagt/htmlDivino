import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentoListComponent} from './documento-list/documento-list.component';
import {DocumentoService} from "./service/documento.service";
import {DocumentoRouting} from "./documento.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {AutoCompleteModule, DropdownModule, TooltipModule} from "primeng/primeng";
import {DialogModule} from 'primeng/primeng';
import { DocumentoFormComponent } from './documento-form/documento-form.component';
import { DocumentoDetailComponent } from './documento-detail/documento-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        DialogModule,
        DocumentoRouting,
        AutoCompleteModule
    ],
    declarations: [DocumentoListComponent, DocumentoFormComponent, DocumentoDetailComponent],
    providers: [
        DocumentoService
    ]
})
export class DocumentosModule {
}
