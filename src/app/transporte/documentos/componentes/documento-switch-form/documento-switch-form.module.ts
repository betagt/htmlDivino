import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchDocumentoComponent} from './switch-documento/switch-documento.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";
import {CalendarModule, DropdownModule} from "primeng/primeng";
import {TextMaskModule} from "angular2-text-mask";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        CalendarModule,
        DropdownModule,
        TextMaskModule
    ],
    declarations: [SwitchDocumentoComponent],
    exports: [
        SwitchDocumentoComponent
    ]
})
export class DocumentoSwitchFormModule {
}
