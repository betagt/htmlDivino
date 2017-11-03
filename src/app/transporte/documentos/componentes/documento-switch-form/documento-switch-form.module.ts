import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SwitchDocumentoComponent} from './switch-documento/switch-documento.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [SwitchDocumentoComponent],
    exports: [
        SwitchDocumentoComponent
    ]
})
export class DocumentoSwitchFormModule {
}
