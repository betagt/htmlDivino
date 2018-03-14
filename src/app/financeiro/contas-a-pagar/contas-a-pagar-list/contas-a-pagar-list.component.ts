import {ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {ContasAPagarService} from "../service/contas-a-pagar.service";

@Component({
    selector: 'app-contas-a-pagar-list',
    templateUrl: './contas-a-pagar-list.component.html',
    styleUrls: ['./contas-a-pagar-list.component.css']
})
export class ContasAPagarListComponent extends ListAbstract implements OnInit {

    constructor(private contasAPagarService: ContasAPagarService,
                private ngZone: NgZone,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, contasAPagarService);
        this.buttons.remove = true;
        this.buttons.custom = false;
        this.hasExclude = false;
        super.form({
            'planos.nome': [null, Validators.compose([Validators.required])],
            'field': ['id'],
            'order': ['desc']
        });
    }

    ngOnInit() {
        this.list();
    }

    baixar() {

    }
}
