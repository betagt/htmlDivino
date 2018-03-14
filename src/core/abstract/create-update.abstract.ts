import {Injectable} from '@angular/core';
import {URLSearchParams} from '@angular/http';
import {FormGroup, FormBuilder} from '@angular/forms';
import {ChangeDetectorRef} from '@angular/core';
import {Location} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../services/alert.service.com";

@Injectable()
export abstract class CreateUpdateAbstract {

    routeParams: any = {
        id: null
    };
    protected arr: any[];
    protected countSelect = 0;
    protected itemSelected = 0;
    saveForm: FormGroup;
    protected buttons = {
        new: true,
        view: true,
        edit: true,
        remove: true,
        restaurar: true,
        save: false,
        back: false,
        custom: true,
    };

    constructor(private formBuilder: FormBuilder,
                private ref: ChangeDetectorRef,
                private location: Location,
                private activatedRoute: ActivatedRoute,
                protected router: Router,
                private defaultService: any,
                protected redirect: any = false) {

        this.routeParams = this.activatedRoute.snapshot.params;
    }

    form(form) {
        this.saveForm = this.formBuilder.group(form);
    }

    ngOnChanges(e) {
        this.ref.markForCheck();
    }


    update(data, id = null) {
        if (!this.saveForm.invalid) {
            this.defaultService.update(data, id).subscribe(res => {
                if (this.redirect) {
                    this.router.navigate(this.redirect);
                } else {
                    AlertService.seccessTime(
                        'Registro Cadastrado!');
                }
            }, erro => {
            });
        }
    }

    create(data, id = null) {
        console.log(this.saveForm.invalid);
        if (!this.saveForm.invalid) {
            this.defaultService.create(data, id).subscribe(res => {
                if (this.redirect) {
                    this.router.navigate(this.redirect);
                } else {
                    AlertService.seccessTime(
                        'Registro Salvo!');
                }

            }, erro => {
            });
        }
    }

    updateOrCreate(data) {
        if (!this.saveForm.invalid) {
            this.defaultService.updateOrCreate(data, this.routeParams.id).subscribe(res => {
                if (this.redirect) {
                    this.router.navigate(this.redirect);
                } else {
                    AlertService.seccessTime(
                        'Registro Salvo!');
                }
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
