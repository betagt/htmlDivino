import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DetailAbstract} from "../../../core/abstract/detail.abstract";
import {RolesService} from "../services/roles.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-role-detail',
  templateUrl: './role-detail.component.html',
  styleUrls: ['./role-detail.component.css']
})
export class RoleDetailComponent extends DetailAbstract implements OnInit {

  constructor(private rotaAcessoService: RolesService,
              ref: ChangeDetectorRef,
              location: Location,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(ref, location, activatedRoute, router, rotaAcessoService);
  }

  ngOnInit() {
    this.params.set('include', 'permissions');
    this.show(this.routeParams.id);
  }

}
