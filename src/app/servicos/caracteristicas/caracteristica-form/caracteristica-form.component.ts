import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {CreateUpdateAbstract} from "../../../../core/abstract/create-update.abstract";
import {CaracteristicasService} from "../../service/caracteristicas.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: 'app-caracteristica-form',
    templateUrl: './caracteristica-form.component.html',
    styleUrls: ['./caracteristica-form.component.css']
})
export class CaracteristicaFormComponent extends CreateUpdateAbstract implements OnInit {

    tipo: any[];

    constructor(private caracteristicasService: CaracteristicasService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef,
                location: Location,
                activatedRoute: ActivatedRoute,
                router: Router) {
        super(formBuilder, ref, location, activatedRoute, router, caracteristicasService, ['/caracteristicas']);
    }

    ngOnInit() {
        this.tipo = [];
        this.tipo.push({label: 'Comum', value: 'Comum'});
        this.tipo.push({label: 'Privativa', value: 'Privativa'});
        super.form({
            'titulo': [null, Validators.compose([ Validators.required])],
            'tipo': [null, Validators.compose([Validators.required])],
        });
        if (this.routeParams.id) {
            const params = new URLSearchParams();
            this.caracteristicasService.show(this.routeParams.id).subscribe(caracteristicas => {
                this.saveForm.patchValue(caracteristicas);
            });
            return;
        }
    }

}
