import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {TipoDocumentoService} from "../service/tipo-documento.service";

@Component({
  selector: 'app-habilidade-detail',
  templateUrl: './tipo-documento-detail.component.html',
  styleUrls: ['./tipo-documento-detail.component.css']
})
export class TipoDocumentoDetailComponent extends DetailAbstract implements OnInit {

  constructor(private tipoDocumentoService: TipoDocumentoService,
              ref: ChangeDetectorRef,
              location: Location,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(ref, location, activatedRoute, router, tipoDocumentoService);
  }

  ngOnInit() {
    this.params.set('include', 'roles');
    this.show(this.routeParams.id);
  }

}