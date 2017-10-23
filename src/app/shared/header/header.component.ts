import {Component, ViewContainerRef, ComponentFactoryResolver} from '@angular/core';
import {ContextMenuService} from "../../../core/services/context-menu.service";
import {ContextMenuComponent, ContextMenuOption} from "../../../core/menu/context-menu.component";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    options: ContextMenuOption[] = [];

  constructor(
      private contextMenuService: ContextMenuService,
      viewContainer: ViewContainerRef,
      private contextService: ContextMenuService,
      private componentFactoryResolver: ComponentFactoryResolver) {
    contextMenuService.viewContainerRef = viewContainer;

   /* const teste = contextMenuService.viewContainerRef.createComponent(this.componentFactoryResolver.resolveComponentFactory(ContextMenuComponent));
    teste.instance.options= this.options;

      console.log(teste.instance.options);*/
  }
}
