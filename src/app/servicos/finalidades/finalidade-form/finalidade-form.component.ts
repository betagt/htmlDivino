import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {FinalidadeService} from "../../service/finalidade.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {CaracteristicasService} from "../../service/caracteristicas.service";
import {SelectItem} from "primeng/primeng";
import {URLSearchParams} from "@angular/http";

@Component({
    selector: 'app-finalidade-form',
    templateUrl: './finalidade-form.component.html',
    styleUrls: ['./finalidade-form.component.css']
})
export class FinalidadeFormComponent extends CreateUpdateAbstract implements OnInit {

    finalidade;

    caracteristicas: SelectItem[] = [];

    finalidades: SelectItem[] = [];

    constructor(private finalidadeService: FinalidadeService,
                private caracteristicasService: CaracteristicasService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, finalidadeService, ['/finalidades']);

    }

    ngOnInit() {
        super.form({
            'parent_id': [null],
            'titulo': [null, Validators.compose([Validators.required])],
            'caracteristicas': [null],
        });
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            params.append('include', 'caracteristicas');
            this.finalidadeService.show(this.routeParams.id, params).subscribe(finalidade => {
                finalidade.caracteristicas = Object.keys(finalidade.caracteristicas.data)
                    .map(key => finalidade.caracteristicas.data[key]['id'])
                    .map(x => x);
                this.saveForm.patchValue(finalidade);
                this.loadCaracteristicas();
            });
            return;
        }
        this.loadCaracteristicas();
    }

    loadCaracteristicas() {
        this.finalidadeService.selectlist().subscribe(res => {
            this.finalidades = res;
            this.caracteristicasService.selectlist().subscribe(response => {
                this.caracteristicas = response;
            });
        });
    }
}