import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PermissionService} from "../service/permission.service";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {DetailAbstract} from "../../../core/abstract/detail.abstract";

@Component({
  selector: 'app-permission-detail',
  templateUrl: './permission-detail.component.html',
  styleUrls: ['./permission-detail.component.css'],
})
export class PermissionDetailComponent extends DetailAbstract implements OnInit {

  constructor(private permissionService: PermissionService,
              ref: ChangeDetectorRef,
              location: Location,
              activatedRoute: ActivatedRoute,
              router: Router) {
    super(ref, location, activatedRoute, router, permissionService);
  }

  ngOnInit() {
    this.params.set('include', 'roles');
    this.show(this.routeParams.id);
  }

}
