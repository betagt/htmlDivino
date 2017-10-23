import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnuncioListComponent} from './anuncio-list/anuncio-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {
    AutoCompleteModule,
    CalendarModule,
    DialogModule,
    DragDropModule,
    DropdownModule,
    FileUploadModule,
    StepsModule,
    TooltipModule
} from "primeng/primeng";
import {AnunciosRouting} from "./anuncios.routing";
import {AnunciosService} from "../service/anuncios.service";
import {AlertService} from "../../../core/services/alert.service.com";
import {UsuariosService} from "../../usuarios/usuarios.service";
import {AnuncioFormComponent} from './anuncio-form/anuncio-form.component';
import {ImovelFormComponent} from './anuncio-form/imovel-form/imovel-form.component';
import {EmpreendimentoFormComponent} from './anuncio-form/empreendimento-form/empreendimento-form.component';
import {FinalidadeService} from "../service/finalidade.service";
import {CheckboxModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {BairroService} from "../../localidades/service/bairro.service";
import {CidadesService} from "../../localidades/service/cidades.service";
import {EstadosService} from "../../localidades/service/estados.service";
import {CaracteristicasService} from "../service/caracteristicas.service";
import {MultiSelectModule} from 'primeng/primeng';
import {GeoService} from "../../localidades/service/geo.service";
import {AgmCoreModule} from "angular2-google-maps/core";
import {DndModule} from 'ng2-dnd';
import {TextMaskModule} from "angular2-text-mask";
import {DiMaskDirective} from "../../../core/directives/di-mask.directive";


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        Ng2PaginationModule,
        DialogModule,
        TooltipModule,
        DropdownModule,
        AutoCompleteModule,
        StepsModule,
        CheckboxModule,
        InputTextareaModule,
        MultiSelectModule,
        DragDropModule,
        FileUploadModule,
        TextMaskModule,
        DndModule.forRoot(),
        AnunciosRouting,
        CalendarModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyB8oVgow8oHD39XeWZhvQSU00IeUBLvrUU'
        })
    ],
    declarations: [
        AnuncioListComponent,
        AnuncioFormComponent,
        ImovelFormComponent,
        EmpreendimentoFormComponent
    ],
    providers: [
        AnunciosService,
        AlertService,
        UsuariosService,
        FinalidadeService,
        EstadosService,
        CidadesService,
        CaracteristicasService,
        BairroService,
        GeoService
    ]
})
export class AnunciosModule {
}
