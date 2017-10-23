import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from '../../../../core/abstract/list.abstract';
import {FormBuilder, Validators} from '@angular/forms';
import {TipoDocumentoService} from "../service/tipo-documento.service";

@Component({
  selector: 'app-habilidade-list',
  templateUrl: './tipo-documento-list.component.html',
  styleUrls: ['./tipo-documento-list.component.css']
})
export class TipoDocumentoListComponent extends ListAbstract implements OnInit {

  constructor(private tipoDocumentoService: TipoDocumentoService,
              formBuilder: FormBuilder,
              ref: ChangeDetectorRef) {
    super(formBuilder, ref, tipoDocumentoService);
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
