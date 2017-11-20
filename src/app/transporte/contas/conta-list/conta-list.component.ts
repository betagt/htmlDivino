import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {ContaService} from "../service/conta.service";

@Component({
  selector: 'app-conta-list',
  templateUrl: './conta-list.component.html',
  styleUrls: ['./conta-list.component.css']
})
export class ContaListComponent extends ListAbstract implements OnInit {


    constructor(private tipoDocumentoService: ContaService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, tipoDocumentoService);
    }

    ngOnInit(): void {
        super.form({
            'contas.code': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['dec']
        });
        this.list();
    }

}
