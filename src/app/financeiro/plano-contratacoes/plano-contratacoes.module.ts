import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Ng2PaginationModule} from "ng2-pagination";

import {PlanoContratacaoListComponent} from './plano-contratacao-list/plano-contratacao-list.component';
import {PlanoContratacoesRouting} from "./plano-contratacoes.routing";
import {SharedModule} from "../../shared/shared.module";
import {AutoCompleteModule, DropdownModule, TooltipModule} from "primeng/primeng";
import {PlanoContratacoesService} from "./service/plano-contratacoes.service";
import {PlanoContratacaoFormComponent} from './plano-contratacao-form/plano-contratacao-form.component';
import {UsuariosService} from "../../usuarios/usuarios.service";
import {PlanosService} from "../planos/service/planos.service";
import {AnunciosService} from "../../servicos/service/anuncios.service";

import {StepsModule, MenuItem} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

import {EstadosService} from "../../localidades/service/estados.service";
import {CidadesService} from "../../localidades/service/cidades.service";
import {BairroService} from "../../localidades/service/bairro.service";
import {DiMaskDirective} from "../../../core/directives/di-mask.directive";
import {TimeHelper} from "../../../core/helpers/time.helper";
import {StorageService} from "../../../core/services/storage.service";
import {FormasPagamentoService} from "../formas-pagamento/service/formas-pagamento.service";
import {PagseguroService} from "../../../core/services/pagseguro.service";
import { PlanoContratacaoDetailComponent } from './plano-contratacao-detail/plano-contratacao-detail.component';
import {TabelaContratacaoLancamentoComponent} from "./tabela-contratacao-lancamentos/tabela-contratacao-lancamentos.component";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        TooltipModule,
        DropdownModule,
        PlanoContratacoesRouting,
        AutoCompleteModule,
        StepsModule,
        SelectButtonModule,
        CheckboxModule,
        TabViewModule,
        DialogModule
    ],
    declarations: [
        PlanoContratacaoListComponent,
        PlanoContratacaoFormComponent,
        PlanoContratacaoDetailComponent,
        TabelaContratacaoLancamentoComponent
    ],
    providers: [
        PlanoContratacoesService,
        UsuariosService,
        PlanosService,
        AnunciosService,
        EstadosService,
        CidadesService,
        BairroService,
        TimeHelper,
        StorageService,
        FormasPagamentoService,
        PagseguroService
    ]
})
export class PlanoContratacoesModule {
}
