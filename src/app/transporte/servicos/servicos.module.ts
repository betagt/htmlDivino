import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicoListComponent } from './servico-list/servico-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import {Ng2PaginationModule} from "ng2-pagination";
import {DropdownModule, TooltipModule} from "primeng/primeng";
import {ServicosRouting} from "./servicos.routing";
import {ServicoService} from "./service/servico.service";
import { ServicoFormComponent } from './servico-form/servico-form.component';
import {CheckboxModule} from 'primeng/primeng';
import { ServicoDetailComponent } from './servico-detail/servico-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    Ng2PaginationModule,
    TooltipModule,
    DropdownModule,
    CheckboxModule,
    ServicosRouting
  ],
  declarations: [ServicoListComponent, ServicoFormComponent, ServicoDetailComponent],
  providers: [
      ServicoService
  ]
})
export class ServicosModule { }
