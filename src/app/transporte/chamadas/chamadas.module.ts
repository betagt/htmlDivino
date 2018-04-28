import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MinhasChamadasComponent} from './minhas-chamadas/minhas-chamadas.component';
import {ChamadasRouting} from "./chamadas.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {ChamadasService} from "./services/chamadas.service";
import {GerenciarChamadasComponent} from "./gerenciar-chamadas/gerenciar-chamadas.component";
import { ModalDetalheChamadaComponent } from './modal-detalhe-chamada/modal-detalhe-chamada.component';
import {DialogModule} from "primeng/primeng";
import {AgmCoreModule} from "angular2-google-maps/core";
import {TimerPipe} from "../../../core/pipes/timer.pipe";

@NgModule({
    imports: [
        AgmCoreModule.forRoot({apiKey: 'AIzaSyCqpi3xiwlyPBcZeGiG7tBkv4ulGYdzesM'}),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        DialogModule,
        ChamadasRouting
    ],
    declarations: [
        MinhasChamadasComponent,
        GerenciarChamadasComponent,
        ModalDetalheChamadaComponent,
        TimerPipe
    ],
    providers: [
        ChamadasService
    ]
})
export class ChamadasModule {
}
