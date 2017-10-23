import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ListAbstract} from "../../../../core/abstract/list.abstract";
import {FormBuilder, Validators} from "@angular/forms";
import {PlanoContratacoesService} from "../service/plano-contratacoes.service";

@Component({
  selector: 'app-plano-contratacao-list',
  templateUrl: './plano-contratacao-list.component.html',
  styleUrls: ['./plano-contratacao-list.component.css']
})
export class PlanoContratacaoListComponent extends ListAbstract implements OnInit {

  constructor(private planoContratacoesService: PlanoContratacoesService,
              formBuilder: FormBuilder,
              ref: ChangeDetectorRef) {
    super(formBuilder, ref, planoContratacoesService);
    this.buttons.new = true;
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
