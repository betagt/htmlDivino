import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {PlanosService} from "../service/planos.service";

@Component({
    selector: 'app-plano-list',
    templateUrl: './plano-list.component.html',
    styleUrls: ['./plano-list.component.css']
})
export class PlanoListComponent extends ListAbstract implements OnInit {

    constructor(private planosService: PlanosService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, planosService);
    }

    ngOnInit(): void {
        super.form({
            'planos.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['desc']
        });
        this.list();
    }

}
