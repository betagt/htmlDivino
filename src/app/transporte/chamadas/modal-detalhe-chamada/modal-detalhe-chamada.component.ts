import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-detalhe-chamada',
  templateUrl: './modal-detalhe-chamada.component.html',
  styleUrls: ['./modal-detalhe-chamada.component.css']
})
export class ModalDetalheChamadaComponent implements OnInit {

  @Input('chamada') chamada;

  constructor() { }

  ngOnInit() {
  }

}
