import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {FinalidadeService} from "../../service/finalidade.service";
import {ListAbstract} from "../../../../core/abstract/list.abstract";

@Component({
    selector: 'app-finalidade-list',
    templateUrl: './finalidade-list.component.html',
    styleUrls: ['./finalidade-list.component.css']
})
export class FinalidadeListComponent extends ListAbstract implements OnInit {

    constructor(private finalidadeService: FinalidadeService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, finalidadeService);
        this.buttons.view = true;
    }

    ngOnInit(): void {
        super.form({
            'finalidades.id': [null],
            'finalidades.parent_id': [null],
            'finalidades.titulo': [null],
            'field': ['id'],
            'order': ['desc']
        });
        this.list();
    }

}
