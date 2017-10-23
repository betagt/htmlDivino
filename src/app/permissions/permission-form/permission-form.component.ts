import {ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {CreateUpdateAbstract} from "../../../core/abstract/create-update.abstract";
import {PermissionService} from "../service/permission.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../core/services/alert.service.com";
import {URLSearchParams} from "@angular/http";

declare var $: any;

@Component({
    selector: 'app-permission-form',
    templateUrl: './permission-form.component.html',
    styleUrls: ['./permission-form.component.css']
})
export class PermissionFormComponent extends CreateUpdateAbstract implements OnInit {

    slugs;
    permissions;
    @ViewChild('selectpicker') selectRef: ElementRef;

    constructor(private permissionService: PermissionService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, permissionService);
    }

    ngOnInit() {
        super.form({
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'slug': [null, Validators.compose([Validators.required])],
            'description': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(500)])],
            //'inherit_id': [null, Validators.compose([Validators.required])]
        });
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            params.append('include', 'roles');
            this.permissionService.show(this.routeParams.id, params).subscribe(permissions => {
                this.saveForm.patchValue(permissions);
                this.permissions = permissions;
                this.slugsLoad();
            });
            return;
        }
        this.slugsLoad();
    }

    private slugsLoad() {
        this.permissionService.slugs().subscribe(slugs => {
            this.slugs = slugs;
            this.loadJquery();
        });
    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            if (this.slugs) {
                this.updateSelectList();
            }
            $('.selectpickeArc').selectpicker({
                noneSelectedText: 'Selecione o tipo da permissão'
            });
        });
    }

    updateSelectList() {
        const options = this.selectRef.nativeElement.options;
        const slugs = this.permissions.slug;
        for (let i = 0; i < options.length; i++) {
            options[i].selected = slugs[options[i].value.split(':')[1].replace(/(\s)|(')/g, '')];
        }
    }

    updateOrCreate(data) {
        if (!this.saveForm.invalid) {
            const slugs = this.permissions.slug;
            if (data.slug.length > 0) {
                let items = [];
                let i: any;
                for (i in this.slugs) {
                    items[this.slugs[i].value] = !(data.slug.indexOf(this.slugs[i].value) == -1);
                }
                data.slug = Object.assign({}, items);
            }
            this.permissionService.updateOrCreate(data, this.routeParams.id).subscribe(res => {
                this.router.navigate(['/permissions']);
            }, erro => {
                if (erro.status == 422) {
                    const response = JSON.parse(erro._body);
                    let text = '';
                    for (let erro in response) {
                        for (let msg in response[erro]) {
                            text += erro + ': ' + response[erro][msg] + '<br>';
                        }
                    }
                    AlertService.errorTime(text);
                }
            });
        }
    }
}
