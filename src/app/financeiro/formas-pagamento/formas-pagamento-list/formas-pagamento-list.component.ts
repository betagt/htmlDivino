import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {FormasPagamentoService} from "../service/formas-pagamento.service";

@Component({
  selector: 'app-formas-pagamento-list',
  templateUrl: './formas-pagamento-list.component.html',
  styleUrls: ['./formas-pagamento-list.component.css']
})
export class FormasPagamentoListComponent extends ListAbstract implements OnInit {

  constructor(private formasPagamentoService: FormasPagamentoService,
              formBuilder: FormBuilder,
              ref: ChangeDetectorRef) {
    super(formBuilder, ref, formasPagamentoService);
  }

  ngOnInit(): void {
    super.form({
      'forma_pagamentos.nome': [null, Validators.compose([Validators.minLength(3), Validators.maxLength(255)])],
      'field': ['id'],
      'order': ['dec']
    });
    this.list();
  }
}
