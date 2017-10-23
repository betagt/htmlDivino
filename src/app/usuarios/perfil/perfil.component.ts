import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private buttons = {
    new: true,
    view: true,
    edit: true,
    remove: true,
    save: true,
    back: true,
    restaurar: true,
  };

  constructor() { }

  ngOnInit() {
  }

}
