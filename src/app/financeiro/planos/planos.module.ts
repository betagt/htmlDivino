import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlanosRouting} from "./planos.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";

import {TooltipModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';

import {PlanoListComponent} from "./plano-list/plano-list.component";
import {PlanosService} from "./service/planos.service";
import { PlanoFormComponent } from './plano-form/plano-form.component';
import { TabelaPrecoListComponent } from './tabela-preco-list/tabela-preco-list.component';
import { TabelaPrecoFormComponent } from './tabela-preco-form/tabela-preco-form.component';
import {SharedModule} from "../../shared/shared.module";
import {EstadosService} from "../../localidades/service/estados.service";
import {CidadesService} from "../../localidades/service/cidades.service";
import { PlanoDetailComponent } from './plano-detail/plano-detail.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        PlanosRouting,
        DialogModule,
        TooltipModule,
        DropdownModule
    ],
    declarations: [
        PlanoListComponent,
        PlanoFormComponent,
        TabelaPrecoListComponent,
        TabelaPrecoFormComponent,
        PlanoDetailComponent
    ],
    providers: [
        PlanosService,
        EstadosService,
        CidadesService
    ]
})
export class PlanosModule {
}
