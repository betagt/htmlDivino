import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ContextMenuComponent} from "../../core/menu/context-menu.component";
import {ContextMenuService} from "../../core/services/context-menu.service";
import {TemplateComponent} from "./template/template.component";
import { ButtonsComponent } from './buttons/buttons.component';
import {ConfiguracoesComponent} from "../configuracoes/configuracoes.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ErrorMessageComponent} from "../../core/component/error-message/error-message.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        TemplateComponent,
        ContextMenuComponent,
        ButtonsComponent,
        ConfiguracoesComponent,
        ErrorMessageComponent
    ],
    providers: [
        ContextMenuService
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        TemplateComponent,
        ContextMenuComponent,
        ButtonsComponent,
        ErrorMessageComponent
    ],
    entryComponents: [ContextMenuComponent]
})
export class SharedModule {}

