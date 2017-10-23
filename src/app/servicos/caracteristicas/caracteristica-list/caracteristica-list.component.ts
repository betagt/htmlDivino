import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {CaracteristicasService} from "../../service/caracteristicas.service";
import {FormBuilder, Validators} from "@angular/forms";
import {ListAbstract} from "../../../../core/abstract/list.abstract";

@Component({
  selector: 'app-caracteristica-list',
  templateUrl: './caracteristica-list.component.html',
  styleUrls: ['./caracteristica-list.component.css']
})
export class CaracteristicaListComponent extends ListAbstract implements OnInit {

  constructor(private caracteristicasService: CaracteristicasService,
              formBuilder: FormBuilder,
              ref: ChangeDetectorRef) {
    super(formBuilder, ref, caracteristicasService);
    this.buttons.view = true;
  }

  ngOnInit(): void {
    super.form({
      'caracteristicas.titulo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
      'caracteristicas.tipo': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
      'field': ['id'],
      'order': ['desc']
    });
    this.list();
  }

}
