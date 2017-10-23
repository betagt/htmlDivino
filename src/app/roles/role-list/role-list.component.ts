import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {RolesService} from "../services/roles.service";

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.css']
})
export class RoleListComponent extends ListAbstract implements OnInit {

    constructor(private roleService: RolesService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, roleService);
        this.includes = ['permissions'];
    }

    ngOnInit(): void {
        super.form({
            'roles.name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'roles.slug': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'roles.description': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(1000)])],
            'field': ['id'],
            'order': ['desc']
        });
        this.list();
    }

}
