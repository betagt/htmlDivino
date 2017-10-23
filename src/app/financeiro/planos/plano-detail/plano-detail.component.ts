import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from "../../../../core/abstract/detail.abstract";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {PlanosService} from "../service/planos.service";

@Component({
  selector: 'app-plano-detail',
  templateUrl: './plano-detail.component.html',
  styleUrls: ['./plano-detail.component.css']
})
export class PlanoDetailComponent extends DetailAbstract implements OnInit {

  constructor(private planosService: PlanosService,
              ref: ChangeDetectorRef,
              location: Location,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(ref, location, activatedRoute, router, planosService);
  }

  ngOnInit() {
    this.show(this.routeParams.id);
  }

}
