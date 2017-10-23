import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {ServicoService} from "../service/servico.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-servico-list',
  templateUrl: './servico-list.component.html',
  styleUrls: ['./servico-list.component.css']
})
export class ServicoListComponent extends ListAbstract implements OnInit {

  constructor(private servicoService: ServicoService,
              formBuilder: FormBuilder,
              ref: ChangeDetectorRef) {
    super(formBuilder, ref, servicoService);
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
