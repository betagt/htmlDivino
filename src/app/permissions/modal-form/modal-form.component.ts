import {AfterViewChecked, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {CreateUpdateAbstract} from '../../../core/abstract/create-update.abstract';
import {PermissionService} from '../service/permission.service';
import {StorageService} from '../../../core/services/storage.service';
import {AlertService} from '../../../core/services/alert.service.com';
import {FormBuilder, Validators} from '@angular/forms';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';


declare var $: any;

@Component({
    selector: 'app-modal-form',
    templateUrl: './modal-form.component.html',
    styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent extends CreateUpdateAbstract implements OnInit, AfterViewChecked {

    slugs;
    isCountdownInitialized;

    constructor(private permissionService: PermissionService,
                private storageService: StorageService,
                private alertService: AlertService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, permissionService);
        super.form({
            'name': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255), Validators.required])],
            'slug': [null, Validators.compose([Validators.required])],
            'description': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(500)])],
        });
        const item = this.storageService.getMemory('selectListSlugsModal');
        if (item) {
            this.slugs = this.storageService.getMemory('selectListSlugsModal');
            return;
        }
    }

    ngOnInit() {

    }

    loadJquery() {
        this.ngZone.onMicrotaskEmpty.first().subscribe(() => {
            $('.selectpickeArc').selectpicker({
                noneSelectedText: 'Selecione o tipo da permissão'
            });
        });
    }

    ngAfterViewChecked() {
        if (!this.isCountdownInitialized && $('.selectpickeArc').length) {
            this.isCountdownInitialized = true;
            this.permissionService.slugs().subscribe(slugs => {
                this.storageService.setMemory('selectListSlugsModal', slugs);
                this.slugs = slugs;
                this.loadJquery();
            });
        }
    }

    updateOrCreate(data) {
        if (!this.saveForm.invalid) {
            if (data.slug.length > 0) {
                let items = [];
                for (let i in  data.slug) {
                    items[data.slug[i]] = true;
                }
                data.slug = Object.assign({}, items);
            }
            this.permissionService.updateOrCreate(data).subscribe(res => {
                AlertService.seccessTime('Registro Salvo!');
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
