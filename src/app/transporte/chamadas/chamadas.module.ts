import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinhasChamadasComponent} from './minhas-chamadas/minhas-chamadas.component';
import {ChamadasRouting} from "./chamadas.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {ChamadasService} from "./services/chamadas.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        ChamadasRouting
    ],
    declarations: [MinhasChamadasComponent],
    providers: [
        ChamadasService
    ]
})
export class ChamadasModule {
}
