import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {CreateUpdateAbstract} from "../../../core/abstract/create-update.abstract";
import {RolesService} from "../services/roles.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {URLSearchParams} from "@angular/http";
import {PermissionService} from "../../permissions/service/permission.service";
import {StorageService} from "../../../core/services/storage.service";
import {AlertService} from "../../../core/services/alert.service.com";
import {Observable} from "rxjs";
import {TimeHelper} from "../../../core/helpers/time.helper";

declare var $: any;

@Component({
    selector: 'app-role-form',
    templateUrl: './role-form.component.html',
    styleUrls: ['./role-form.component.css'],
    providers: [
        TimeHelper
    ]
})
export class RoleFormComponent extends CreateUpdateAbstract implements OnInit{

    private role;

    private permissions;

    display: boolean = false;

    @ViewChild('selectpicker') selectRef: ElementRef;

    constructor(private rolesService: RolesService,
                private permissionService: PermissionService,
                private storageService: StorageService,
                private timeHelper: TimeHelper,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, rolesService);

    }

    showDialog() {
        this.display = true;
    }
    ngOnInit() {
        super.form({
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'slug': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'description': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(500)])],
            'permissions': [null, Validators.compose([Validators.required])]
        });
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            params.append('include', 'permissions');
            this.rolesService.show(this.routeParams.id, params).subscribe(rotas => {
                this.saveForm.patchValue(rotas);
                this.role = rotas;
                this.loadPermissions();
            });
            return;
        }

        this.loadPermissions();
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            if (this.routeParams.id) {
                this.updateSelectList();
            }
            $('.selectpickeAr').selectpicker({
                noneSelectedText: 'Selecione o tipo da permissão'
            });
        });
    }

    loadPermissions() {
        console.log(this.storageService.hasMemory('selectListRole'));
        if (this.storageService.hasMemory('selectListRole')) {
            this.permissions = this.storageService.getMemory('selectListRole');
            this.loadJquery();
            return;
        }
        this.permissionService.listaSelect().subscribe(permissions => {
            this.storageService.setMemory('selectListRole', permissions, this.timeHelper.addSeconds(50));
            this.permissions = permissions;
            this.loadJquery();
        });
    }

    updateSelectList() {
        const options = this.selectRef.nativeElement.options;
        const permissions = this.role.permissions.data;
        for (let i = 0; i < options.length; i++) {
            options[i].selected = permissions.some(variavel => variavel.id == Number(options[i].value.split(':')[1]));
        }
    }

    updateOrCreate(user) {
        if (!this.saveForm.invalid) {
            if (user.permissions.data) {
                const data = user.permissions.data;
                user.permissions = [];
                for (let i = 0; i < data.length; i++) {
                    user.permissions.push(data[i].id);
                }
            }
            this.rolesService.updateOrCreate(user, this.routeParams.id).subscribe(res => {
                this.router.navigate(['/perfil-usuario']);
            });
        }
    }
}
