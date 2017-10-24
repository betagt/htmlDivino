import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {VeiculoService} from "../service/veiculo.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-veiculos-list',
  templateUrl: './veiculos-list.component.html',
  styleUrls: ['./veiculos-list.component.css']
})
export class VeiculosListComponent extends ListAbstract implements OnInit {

    constructor(private veiculoService: VeiculoService,
                formBuilder: FormBuilder,
                ref: ChangeDetectorRef) {
        super(formBuilder, ref, veiculoService);
    }

    ngOnInit(): void {
        super.form({
            'habilidades.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
            'field': ['id'],
            'order': ['dec']
        });
        this.list();
    }

}
