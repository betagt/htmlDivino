import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {ServicoService} from "../service/servico.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-servico-detail',
  templateUrl: './servico-detail.component.html',
  styleUrls: ['./servico-detail.component.css']
})
export class ServicoDetailComponent extends DetailAbstract implements OnInit {

  constructor(private tipoDocumentoService: ServicoService,
              ref: ChangeDetectorRef,
              location: Location,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(ref, location, activatedRoute, router, tipoDocumentoService);
  }

  ngOnInit() {
    this.show(this.routeParams.id);
  }

}
