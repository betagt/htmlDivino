import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../core/abstract/list.abstract";
import {PermissionService} from "../service/permission.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-permission-list',
  templateUrl: './permission-list.component.html',
  styleUrls: ['./permission-list.component.css']
})
export class PermissionListComponent extends ListAbstract implements OnInit {

  constructor(private permissionService: PermissionService,
              formBuilder: FormBuilder,
              ref: ChangeDetectorRef) {
    super(formBuilder, ref, permissionService);
  }

  ngOnInit(): void {
    super.form({
      'permissions.name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
      'field': ['id'],
      'order': ['desc']
    });
    this.list();
  }

}
